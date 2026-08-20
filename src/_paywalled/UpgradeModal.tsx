import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, X, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Lemon Squeezy checkout. Set VITE_LEMON_CHECKOUT_URL in .env to the "Share"
// link on the product page in Lemon Squeezy — it looks like
// https://yourstore.lemonsqueezy.com/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
const PAYMENT_LINK = import.meta.env.VITE_LEMON_CHECKOUT_URL as string;

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
  const { user, signInWithGoogle } = useAuth();

  // Auto-open checkout after OAuth redirect from upgrade flow
  useEffect(() => {
    if (open && autoTrigger && user?.email) {
      openCheckout(user.email);
    }
  }, [open, autoTrigger, user]);

  if (!open) return null;

  const handleUpgrade = () => {
    if (!user) {
      localStorage.setItem("pendingUpgrade", "true");
      signInWithGoogle();
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

        <Button onClick={handleUpgrade} className="w-full gap-2 font-bold py-5 text-base shadow-lg shadow-primary/20">
          <Sparkles className="w-4 h-4" />
          {user ? "Upgrade Now" : "Sign In to Upgrade"}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          Secure payment via Lemon Squeezy. No hidden fees.
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;
