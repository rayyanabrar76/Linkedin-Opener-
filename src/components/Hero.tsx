import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onEnter: () => void;
}

const Hero = ({ onEnter }: HeroProps) => {
  return (
    // pt-16 offsets the fixed header height
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-background to-secondary/30 pt-14">

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary/10 rounded-full animate-float"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${18 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-[120px] animate-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Now with AI-Powered CEO & Email Detection</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up leading-tight">
          Open LinkedIn Profiles
          <br />
          <span className="gradient-text">In One Click</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          The ultimate productivity tool for recruiters, sales professionals, and networkers.
          Instantly find emails, find CEOs, open multiple profiles, and supercharge your workflow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button
            size="lg"
            className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={onEnter}
          >
            Start For Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div>
            <div className="text-4xl font-bold gradient-text">10K+</div>
            <div className="text-sm text-muted-foreground mt-1">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text">1M+</div>
            <div className="text-sm text-muted-foreground mt-1">Profiles Opened</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Hours Saved Daily</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;