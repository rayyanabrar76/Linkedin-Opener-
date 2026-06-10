import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Zap,
  MousePointerClick,
  Search,
  FileDown,
  ArrowRight,
  LogOut,
  LogIn
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  const { theme, setTheme } = useTheme();
  const { user, isSubscribed, signInWithGoogle, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // States for scroll direction detection
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 20);

      if (currentScrollPos < 10) {
        setVisible(true);
      } else {
        setVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header 
      className={`fixed top-4 left-0 right-0 z-50 px-4 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-32"
      }`}
    >
      <div className={`container mx-auto max-w-6xl rounded-2xl border transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-border shadow-2xl py-2" 
          : "bg-background/40 backdrop-blur-md border-transparent py-3"
      }`}>
        <div className="flex items-center justify-between px-4">
          
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center gap-2 group shrink-0 min-w-0">
            <a href="/" className="flex items-center gap-2 group shrink-0 min-w-0">
              <div className="bg-primary/10 p-1 rounded-lg transition-all group-hover:rotate-12 group-hover:scale-110 shrink-0">
                <img
                  src="/favicon.svg"
                  alt="LinkedIn Opener Pro logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              {/* Full name on sm+, abbreviated on xs */}
              <span className="font-bold tracking-tight whitespace-nowrap text-sm sm:text-base md:text-lg">
                <span className="hidden xs:inline">LinkedIn Opener </span>
                <span className="xs:hidden">LI Opener </span>
                Pro
              </span>
            </a>
          </div>

          {/* 2. Middle: Navigation (Centered, desktop only) */}
          <nav className="hidden md:flex items-center gap-1 flex-[2] justify-center">
            <NavigationMenu>
              <NavigationMenuList>

                <Button variant="ghost" asChild className="h-9 gap-2 text-sm font-medium hover:bg-primary/5 transition-colors">
                  <a href="#dashboard"><LayoutDashboard className="w-3.5 h-3.5 opacity-60" /> Dashboard</a>
                </Button>

                {/* How It Works Mega Menu with Anchor Link */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/5 h-9 px-4 font-medium transition-colors">
                    <a href="#howitworks" className="w-full h-full flex items-center">How it Works</a>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[420px] p-6 space-y-6">
                      <div className="flex items-center justify-between border-b pb-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">The 3-Step Process</h4>
                        <span className="text-[10px] py-0.5 px-2 bg-primary/10 text-primary rounded-full font-black">QUICK</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start group/step">
                          <div className="mt-1 bg-blue-500/10 p-2 rounded-lg text-blue-500 group-hover/step:scale-110 transition-transform"><MousePointerClick className="w-4 h-4"/></div>
                          <div><p className="text-sm font-semibold">Paste Links</p><p className="text-xs text-muted-foreground font-normal">Import your LinkedIn profile lists.</p></div>
                        </div>
                        <div className="flex gap-3 items-start group/step">
                          <div className="mt-1 bg-purple-500/10 p-2 rounded-lg text-purple-500 group-hover/step:scale-110 transition-transform"><Search className="w-4 h-4"/></div>
                          <div><p className="text-sm font-semibold">AI Enrichment</p><p className="text-xs text-muted-foreground font-normal">Detect job titles and decision-makers.</p></div>
                        </div>
                        <div className="flex gap-3 items-start group/step">
                          <div className="mt-1 bg-emerald-500/10 p-2 rounded-lg text-emerald-500 group-hover/step:scale-110 transition-transform"><FileDown className="w-4 h-4"/></div>
                          <div><p className="text-sm font-semibold">Bulk Action</p><p className="text-xs text-muted-foreground font-normal">Open tabs or export to clean CSV.</p></div>
                        </div>
                      </div>

                      <Button onClick={onGetStarted} className="w-full gap-2 group rounded-xl shadow-lg shadow-primary/20 font-bold active:scale-95 transition-all">
                        Try it Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="ghost" asChild className="h-9 gap-2 text-sm font-medium hover:bg-primary/5 transition-colors">
              <a href="#features"><Zap className="w-3.5 h-3.5 opacity-60" /> Features</a>
            </Button>
          </nav>

          {/* 3. Right: Utility Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full w-9 h-9 border border-transparent hover:bg-primary/5 hover:border-border transition-all shrink-0"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                {isSubscribed && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">Pro</span>
                )}
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {user.email?.[0].toUpperCase()}
                </div>
                <Button size="sm" variant="ghost" onClick={signOut} className="rounded-full px-3 text-sm" title="Sign out">
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={signInWithGoogle} className="rounded-full px-4 hidden sm:flex shadow-md font-semibold hover:shadow-primary/20 transition-all active:scale-95 text-sm gap-2">
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} className="md:hidden rounded-lg w-9 h-9 shrink-0" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-border/50 pt-4 animate-in slide-in-from-top-2 duration-300">
            {[
              { label: 'Dashboard', icon: <LayoutDashboard />, href: '#dashboard' },
              { label: 'How it Works', icon: <MousePointerClick />, href: '#howitworks' },
              { label: 'Features', icon: <Zap />, href: '#features' },
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 text-sm font-semibold transition-colors"
              >
                <span className="text-primary opacity-80">{item.icon}</span> 
                {item.label}
              </a>
            ))}
            <div className="p-2 pt-4">
              <Button onClick={onGetStarted} className="w-full rounded-xl gap-2 font-bold py-6">
                Try LinkedIn Opener Pro Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;