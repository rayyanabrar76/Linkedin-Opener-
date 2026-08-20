import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Building2, X, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Lemon Squeezy checkout. Set VITE_LEMON_CHECKOUT_URL in .env to the "Share"
// link on the product page in Lemon Squeezy — it looks like
// https://yourstore.lemonsqueezy.com/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
const PAYMENT_LINK = import.meta.env.VITE_LEMON_CHECKOUT_URL as string;

/* Payments are OFF until this is set to "true".

   Lemon Squeezy keeps a store in test mode until they approve it, and a test
   checkout will happily take 4242 4242 4242 4242 and unlock the product for
   nothing. On a site that already has visitors that is a door standing open,
   so the checkout stays shut until the store is live. Set
   VITE_PAYMENTS_LIVE=true on Netlify the day it is approved. */
export const PAYMENTS_LIVE = import.meta.env.VITE_PAYMENTS_LIVE === "true";

export const openCheckout = (email: string) => {
  if (!PAYMENT_LINK) {
    alert("Checkout is not configured yet.");
    return;
  }
  // The email is prefilled AND locked, because the webhook matches the payment
  // to an account by email. If the buyer typed a different address at checkout
  // the payment would arrive for an account that does not exist.
  const url = new URL(PAYMENT_LINK);
  url.searchParams.set("checkout[email]", email);
  url.searchParams.set("checkout[custom][user_email]", email);
  url.searchParams.set("embed", "0");
  window.open(url.toString(), "_blank");
};

type Props = {
  open: boolean;
  onClose: () => void;
  autoTrigger?: boolean;
};

const UpgradeModal = ({ open, onClose, autoTrigger }: Props) => {
  const { user, isSubscribed, signInWithGoogle } = useAuth();

  // Someone who already paid and has just signed back in should not be left
  // staring at a page asking them to buy it again.
  useEffect(() => {
    if (open && isSubscribed) onClose();
  }, [open, isSubscribed, onClose]);

  /* Auto-open checkout after the OAuth redirect.

     Guarded by a ref because Supabase hands back a NEW user object every time
     it refreshes the session, and this effect depends on it — without the
     guard every refresh opened another checkout tab, so going back from the
     payment page buried the browser in them. Once per visit is the whole
     intent. */
  const opened = useRef(false);
  useEffect(() => {
    if (!open || !autoTrigger || !user?.email || opened.current) return;
    opened.current = true;
    openCheckout(user.email);
  }, [open, autoTrigger, user]);

  if (!open) return null;

  const handleUpgrade = async () => {
    if (!PAYMENTS_LIVE) return;
    if (!user) {
      localStorage.setItem("pendingUpgrade", "true");
      try {
        await signInWithGoogle();
      } catch (e) {
        // Sign-in failing silently looks exactly like a dead button, which is
        // the worst way for a paid feature to break: the buyer assumes the
        // site is broken and leaves rather than telling you.
        alert("Could not open Google sign-in. Please allow pop-ups and try again.");
      }
      return;
    }
    openCheckout(user.email ?? "");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Unlock Excel Export</h2>
            <p className="text-sm text-muted-foreground">Take your list with you</p>
          </div>
        </div>

        <div className="space-y-2.5 mb-6">
          {[
            "Download your list as a .xlsx spreadsheet",
            "Company, website, LinkedIn page and CEO profile in columns",
            "Every link clickable in Excel and Google Sheets",
            "Unlimited exports, forever — pay once",
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 text-center">
          <div className="text-3xl font-bold">$0.99<span className="text-base font-normal text-muted-foreground"> one-time</span></div>
          <p className="text-xs text-muted-foreground mt-1">Lifetime access, pay once</p>
        </div>

        <Button
          onClick={handleUpgrade}
          disabled={!PAYMENTS_LIVE}
          className="w-full gap-2 font-bold py-5 text-base shadow-lg shadow-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          {!PAYMENTS_LIVE
            ? "Opening soon"
            : user ? "Upgrade Now" : "Sign In to Upgrade"}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          {PAYMENTS_LIVE
            ? "Secure payment via Lemon Squeezy. No hidden fees."
            : "Checkout is being set up — the export unlocks here in a day or two."}
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;
