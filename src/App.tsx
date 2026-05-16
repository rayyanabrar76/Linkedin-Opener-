import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Index (landing page) is the entry point — keep it eagerly imported.
import Index from "./pages/Index";

// Everything else is code-split: each route loads its own chunk on demand.
const BestTools = lazy(() => import("@/pages/BestTools"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Blog Post Imports (lazy)
const BlogCeoEmail = lazy(() => import("@/pages/BlogCeoEmail"));
const BlogAccountSafety = lazy(() => import("@/pages/BlogAccountSafety"));
const BlogSearchFilters = lazy(() => import("@/pages/BlogSearchFilters"));
const BlogBulkOpening = lazy(() => import("@/pages/BlogBulkOpening"));
const BlogLinkedInVsEmail = lazy(() => import("@/pages/BlogLinkedInVsEmail"));

// Utility
import ScrollToTop from "@/components/ScrollToTop";

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center text-muted-foreground">
    Loading…
  </div>
);

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

          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;