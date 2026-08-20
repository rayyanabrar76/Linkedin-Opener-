# LinkedIn Opener Pro — launch notes

Everything about selling the export. Written 20 Aug 2026.

---

## What is being sold

The site is free. Opening profiles, finding CEOs, the preview panel — all free,
and that is what brings people in from Google.

**The Excel export is the paid part.** $0.99, one payment, forever, per person.

---

## How a purchase actually works

```
visitor clicks Export Excel
      ↓ not signed in / not paid
popup: "Unlock Excel Export — $0.99"
      ↓ Sign In to Upgrade
Google sign-in  (Supabase Auth)
      ↓ returns to the site
checkout opens by itself, email already filled in
      ↓ pays
Lemon Squeezy → webhook → Supabase Edge Function
      ↓ signature checked, row written
subscribers.subscribed = true
      ↓ back on the site
Export downloads. Header shows "Pro".
```

The email is the link between the payment and the account. That is why the
checkout locks the email field, and why the thank-you note tells buyers to sign
in with the same address.

---

## The pieces

| piece | where |
|---|---|
| Site | Netlify — profileopener.netlify.app |
| Auth + database | Supabase — project `amtjgzfaabezpqjmclng` |
| Payments | Lemon Squeezy — store `rayyans` |
| Webhook | Supabase Edge Function `lemon-webhook` |
| Paid flag | table `subscribers`, column `subscribed` |
| Unclaimed payments | table `pending_purchases` |

**Environment variables (Netlify → Site configuration → Environment variables)**

```
VITE_SUPABASE_URL           https://amtjgzfaabezpqjmclng.supabase.co
VITE_SUPABASE_ANON_KEY      (public, safe in the browser)
VITE_LEMON_CHECKOUT_URL     https://rayyans.lemonsqueezy.com/checkout/buy/31f59aba-…
VITE_PAYMENTS_LIVE          false   ← see below
```

Vite bakes these in **at build time**, so changing one does nothing until you
trigger a new deploy.

**Supabase secret** (set with the CLI, never in the repo)

```
LEMON_WEBHOOK_SECRET        X3X36syYvtrgFS8w6DQUTUQDmam06i7QKJsP
```

The same string must be in Lemon Squeezy → Settings → Webhooks → Signing
secret. If they differ, every webhook is rejected with a 401 and buyers pay
without ever being unlocked.

---

## VITE_PAYMENTS_LIVE — why the checkout is shut

Lemon Squeezy keeps a store in **test mode** until they approve the account. A
test checkout happily accepts `4242 4242 4242 4242` and unlocks the product for
nothing. The site already gets search traffic, so leaving that reachable is a
door standing open.

While `VITE_PAYMENTS_LIVE` is anything other than `"true"`, the upgrade button
reads **Opening soon** and goes nowhere. Missing means shut, so the safe state
is the one you get by doing nothing.

---

## Launch checklist — the day Lemon Squeezy approves the store

1. **Netlify** → Environment variables → `VITE_PAYMENTS_LIVE` = `true`
2. **Netlify** → Deploys → Trigger deploy (the variable only applies to a new build)
3. **Lemon Squeezy** → turn **Test mode OFF** (toggle, bottom-left)
4. **Lemon Squeezy** → Settings → **Webhooks** → the list will be empty, because
   live and test keep separate webhooks. Create it again:
   - URL: `https://amtjgzfaabezpqjmclng.supabase.co/functions/v1/lemon-webhook`
   - Signing secret: `X3X36syYvtrgFS8w6DQUTUQDmam06i7QKJsP`
   - Events: `order_created`, `order_refunded`
5. **Supabase** → Table Editor → `subscribers` → delete the test row
   (`cbc364f1-…`). It is access nobody paid for.
6. **Payout account** — currently in Hassan Abrar's name while the verified
   identity is Rayyan Abrar. Stripe matches those names and freezes payouts when
   they differ. Replace it with an account in the right name before the balance
   reaches $50.

Step 4 is the one people forget. Forgetting it means real customers pay and are
never unlocked, with nothing in the logs to explain why.

---

## Testing a purchase

With test mode on and `VITE_PAYMENTS_LIVE=true` on a preview build:

```
Card    4242 4242 4242 4242
Expiry  12 / 30      (any future date)
CVC     123          (any three digits)
Name    Test User
Country United States
Address 123 Main Street, San Francisco, California, 94105
```

Then check:
1. **Supabase → subscribers** — a row with `subscribed: true`
2. **The site** — hard refresh, Export Excel downloads, header says **Pro**

---

## When something goes wrong

**Lemon Squeezy → Settings → Webhooks → click the webhook → Recent deliveries.**
Every attempt is listed with the response code.

| code | what it means | fix |
|---|---|---|
| 200 | worked | — |
| 401 | signatures differ | make the secret identical in both places |
| 404 | that email has never signed in | it is queued in `pending_purchases`; they unlock when they sign in |
| 500 | the function threw | Supabase → Edge Functions → lemon-webhook → Logs |

There is a **Resend** button on each delivery. Fix the cause, press Resend, and
the purchase goes through without the customer having to do anything.

A 500 already happened once: `subscribers.user_id` had no unique constraint, so
the upsert failed. Fixed with:

```sql
alter table public.subscribers
  add constraint subscribers_user_id_key unique (user_id);
```

---

## Security — what stops someone taking it for free

| attack | why it fails |
|---|---|
| POST a fake webhook | signature verified against `LEMON_WEBHOOK_SECRET`; anything else gets 401 |
| Set `subscribed = true` on your own row | RLS allows SELECT only; the webhook writes as service role, which bypasses RLS |
| Read or write the tables anonymously | RLS blocks both |
| Refund and keep access | `order_refunded` revokes it |
| Pay in test mode for free | checkout shut unless `VITE_PAYMENTS_LIVE=true` |

Nothing sensitive reaches the browser: only the Supabase anon key and the
checkout URL, both meant to be public. The service-role key and the webhook
secret live on the server. `.env` is gitignored.

---

## Money

Lemon Squeezy take **5% + $0.50** per sale, and they are the Merchant of Record
— they handle VAT and sales tax worldwide, and their name shows on the buyer's
statement.

```
$0.99 sale  →  fee ~$0.55  →  you keep ~$0.44
```

Payouts start once the balance reaches **$50**, which at $0.44 a sale is about
113 sales. Worth knowing before wondering why nothing has arrived.

---

## Ideas for later

- **Licence keys instead of accounts.** Buyer gets a key by email and pastes it
  into the site — no Google sign-in. Less friction for a $0.99 impulse buy.
  Worth doing if checkouts get abandoned at the sign-in step.
- **Raise the price.** At $5 the fee is 15% instead of 55%, and the first payout
  arrives after 12 sales rather than 113.
- **Gate CEO Finder too**, if the export alone turns out not to be worth paying
  for. Right now it is free on purpose — it is what makes the tool useful before
  anyone is asked for money.
