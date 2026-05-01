import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

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
      <Dashboard />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;