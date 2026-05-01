import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Page Imports
import Index from "./pages/Index";
import BestTools from "./pages/BestTools";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "./pages/NotFound";

// Blog Post Imports
import BlogCeoEmail from "@/pages/BlogCeoEmail";
import BlogAccountSafety from "@/pages/BlogAccountSafety";
import BlogSearchFilters from "@/pages/BlogSearchFilters";
import BlogBulkOpening from "@/pages/BlogBulkOpening";
import BlogLinkedInVsEmail from "@/pages/BlogLinkedInVsEmail";

// Utility
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global SEO Metadata */}
        <Helmet>
          <title>LinkedIn Opener Pro - Bulk LinkedIn Profile Opener</title>
          <meta name="description" content="LinkedIn Opener Pro helps you open multiple LinkedIn profiles instantly and find decision makers." />
          
          {/* Schema.org for Google Site Name */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LinkedIn Opener Pro",
              "url": "https://profileopener.netlify.app"
            })}
          </script>

          {/* Open Graph Tags */}
          <meta property="og:site_name" content="LinkedIn Opener Pro" />
          <meta property="og:title" content="LinkedIn Opener Pro" />
          <meta property="og:description" content="Bulk LinkedIn Profile Opener & CEO Finder" />
          <meta property="og:type" content="website" />
        </Helmet>

        {/* UI Feedback Components */}
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          {/* Resets scroll to top on every page navigation */}
          <ScrollToTop />

          <Routes>
            {/* Core Tool Route */}
            <Route path="/" element={<Index />} />

            {/* AdSense Approval Content Routes */}
            <Route path="/best-linkedin-tools" element={<BestTools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Blog Post Routes */}
            <Route path="/blog/find-ceo-email-linkedin" element={<BlogCeoEmail />} />
            <Route path="/blog/linkedin-account-safety" element={<BlogAccountSafety />} />
            <Route path="/blog/linkedin-search-filters-recruiters" element={<BlogSearchFilters />} />
            <Route path="/blog/open-multiple-linkedin-profiles" element={<BlogBulkOpening />} />
            <Route path="/blog/linkedin-vs-email-outreach" element={<BlogLinkedInVsEmail />} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} /> 

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;