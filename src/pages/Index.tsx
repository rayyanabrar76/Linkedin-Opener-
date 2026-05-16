import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

// Dashboard is the heaviest component — split it into its own chunk.
const Dashboard = lazy(() => import("@/components/Dashboard"));

const Index = () => {
  const handleEnter = () => {
    const dashboard = document.getElementById("dashboard");
    dashboard?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onGetStarted={handleEnter} />
      <Hero onEnter={handleEnter} />
      <Features />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-muted-foreground">
            Loading…
          </div>
        }
      >
        <Dashboard />
      </Suspense>
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;