import { Zap, Users, Target, Download, Search, List } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Bulk Opening",
    description: "Open 100+ LinkedIn profiles in under a minute with smart delay management",
  },
  {
    icon: Target,
    title: "Auto-Find CEOs",
    description: "Instantly search and open CEO profiles for any company with one click",
  },
  {
    icon: Users,
    title: "Company & Profile Support",
    description: "Works with company pages, personal profiles, or just company names",
  },
  {
    icon: Download,
    title: "Export to Spreadsheet",
    description: "Download all your leads with working links ready for Google Sheets",
  },
  {
    icon: Search,
    title: "Smart URL Detection",
    description: "Paste any list - URLs, company names, or LinkedIn links - we'll handle it",
  },
  {
    icon: List,
    title: "Live Preview",
    description: "See exactly what will open before you click with categorized preview",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything You Need for <span className="gradient-text">LinkedIn Prospecting</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful automation built for sales teams, recruiters, and networkers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;