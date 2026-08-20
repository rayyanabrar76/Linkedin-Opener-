import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const webhookSecret = Deno.env.get("LEMON_WEBHOOK_SECRET")!;

/**
 * Is this really from Lemon Squeezy?
 *
 * Without this check the endpoint is an open door: anyone who finds the URL can
 * POST {"meta":{"event_name":"order_created"},"data":{"attributes":
 * {"user_email":"them@example.com"}}} and hand themselves the paid version.
 * Lemon Squeezy signs every request with the secret you set on the webhook, so
 * we recompute the signature and compare.
 */
async function isFromLemonSqueezy(raw: string, signature: string | null) {
  if (!signature || !webhookSecret) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(raw),
  );
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // constant-time compare, so the endpoint cannot be used to guess the secret
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}

Deno.serve(async (req) => {
  try {
    // read the body as TEXT first — the signature is over the exact bytes sent,
    // so parsing to JSON and re-stringifying would never match
    const raw = await req.text();
    if (!await isFromLemonSqueezy(raw, req.headers.get("X-Signature"))) {
      return new Response("Bad signature", { status: 401 });
    }

    const body = JSON.parse(raw);
    const eventName = body?.meta?.event_name;
    const email = body?.data?.attributes?.user_email;
    if (!email) return new Response("No email found", { status: 400 });

    // A one-time purchase arrives as order_created. Refunds and chargebacks
    // arrive too, and access has to go away again or a refunded customer keeps
    // the product for free.
    const GRANTS = ["order_created"];
    const REVOKES = ["order_refunded", "subscription_expired",
                     "subscription_cancelled"];
    if (!GRANTS.includes(eventName) && !REVOKES.includes(eventName)) {
      return new Response("Event ignored", { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: userData, error: userError } =
      await supabase.auth.admin.listUsers();
    if (userError) throw userError;

    const user = userData.users.find(
      (u) => u.email?.toLowerCase() === String(email).toLowerCase(),
    );
    if (!user) {
      // They paid with an email they have not signed in with yet. Answering 200
      // stops Lemon Squeezy retrying forever; the pending row is claimed when
      // that address does sign in.
      await supabase.from("pending_purchases")
        .upsert({ email: String(email).toLowerCase() }, { onConflict: "email" });
      return new Response("Queued for that email", { status: 200 });
    }

    const { error } = await supabase
      .from("subscribers")
      .upsert({ user_id: user.id, subscribed: GRANTS.includes(eventName) },
              { onConflict: "user_id" });
    if (error) throw error;

    return new Response("ok", { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
