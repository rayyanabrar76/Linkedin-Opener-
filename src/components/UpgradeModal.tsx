import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, X, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Replace with your Paddle checkout link once approved
const PAYMENT_LINK = "https://TODO_REPLACE_WITH_PADDLE_LINK";

export const openCheckout = (email: string) => {
  window.open(`${PAYMENT_LINK}?email=${encodeURIComponent(email)}`, "_blank");
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
            <h2 className="text-xl font-bold">Unlock CEO Finder</h2>
            <p className="text-sm text-muted-foreground">Find decision-makers instantly</p>
          </div>
        </div>

        <div className="space-y-2.5 mb-6">
          {[
            "Find CEOs of any company on LinkedIn",
            "Bulk CEO search for 200 companies at once",
            "Export leads to Excel with clickable links",
            "Unlimited searches and exports, forever",
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
          Secure payment via Paddle. No hidden fees.
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;
