import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    // Lemon Squeezy sends event type in meta.event_name
    const eventName = body?.meta?.event_name;
    const email = body?.data?.attributes?.user_email;

    if (!email) {
      return new Response("No email found", { status: 400 });
    }

    // Only process successful payment events
    if (eventName !== "order_created") {
      return new Response("Event ignored", { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;

    const user = userData.users.find((u) => u.email === email);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Upsert subscriber record
    const { error } = await supabase
      .from("subscribers")
      .upsert({ user_id: user.id, subscribed: true }, { onConflict: "user_id" });

    if (error) throw error;

    return new Response("Subscription activated", { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
