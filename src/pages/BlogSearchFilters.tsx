import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  ListOrdered,
  Zap,
} from "lucide-react";
import BlogNav from "@/components/BlogNav";

const BlogSearchFilters = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Top 10 LinkedIn Search Filters Every Recruiter Should Master in 2026",
    "description": "Unlock the full power of LinkedIn search. Here are the 10 most powerful filters recruiters use to find qualified candidates faster in 2026.",
    "author": {
      "@type": "Organization",
      "name": "LinkedIn Bulk Opener Team",
    },
    "datePublished": "2026-05-03",
    "image": "https://profileopener.netlify.app/og-image.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "LinkedIn Bulk Opener",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />
      <Helmet>
        <title>Top 10 LinkedIn Search Filters for Recruiters in 2026 | LinkedIn Bulk Opener</title>
        <meta
          name="description"
          content="Unlock the full power of LinkedIn search. Here are the 10 most powerful filters recruiters use to find qualified candidates faster in 2026."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-5xl mx-auto">

          {/* Header */}
          <header className="text-center mb-16">
            <nav className="flex justify-center items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/best-linkedin-tools" className="hover:text-primary">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span>Search Filters</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">
              Top 10 LinkedIn Search Filters <br />
              <span className="text-primary">Recruiters Must Master</span> in 2026
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              LinkedIn has over 1 billion members. Without the right filters,
              finding the perfect candidate is like searching for a needle in a
              haystack. Here's how to search smarter.
            </p>
          </header>

          {/* Disclaimer */}
          <div className="bg-muted/30 border-l-4 border-muted p-4 mb-10 text-sm italic text-muted-foreground">
            Note: Some advanced filters (e.g., "Open to Work — private") are
            only available on LinkedIn Recruiter or Sales Navigator paid plans.
            Free filters are clearly marked below.
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-50 dark:bg-slate-900 border rounded-xl p-6 mb-12">
            <h4 className="flex items-center font-bold mb-4">
              <ListOrdered className="mr-2 h-5 w-5" /> In This Article
            </h4>
            <ul className="grid md:grid-cols-2 gap-2 text-sm">
              <li><a href="#filter1" className="hover:underline text-primary">1. Current Company</a></li>
              <li><a href="#filter2" className="hover:underline text-primary">2. Past Company</a></li>
              <li><a href="#filter3" className="hover:underline text-primary">3. School</a></li>
              <li><a href="#filter4" className="hover:underline text-primary">4. Industry</a></li>
              <li><a href="#filter5" className="hover:underline text-primary">5. Geography</a></li>
              <li><a href="#filter6" className="hover:underline text-primary">6. Years of Experience</a></li>
              <li><a href="#filter7" className="hover:underline text-primary">7. Seniority Level</a></li>
              <li><a href="#filter8" className="hover:underline text-primary">8. Open to Work</a></li>
              <li><a href="#filter9" className="hover:underline text-primary">9. Keywords in Posts</a></li>
              <li><a href="#filter10" className="hover:underline text-primary">10. Boolean Search Strings</a></li>
            </ul>
          </div>

          <div className="prose prose-slate dark:prose-invert lg:prose-xl max-w-none">

            {/* Filter comparison table */}
            <h2 id="comparison">Filter Quick Reference</h2>
            <div className="overflow-x-auto not-prose border rounded-xl my-8">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 border-b">Filter</th>
                    <th className="p-4 border-b">Free?</th>
                    <th className="p-4 border-b">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Current Company", "✅ Yes", "Targeting talent from specific employers"],
                    ["Past Company", "✅ Yes", "Finding alumni from top-tier companies"],
                    ["School", "✅ Yes", "Alumni network hiring"],
                    ["Industry", "✅ Yes", "Sector-specific candidate pools"],
                    ["Geography", "✅ Yes", "On-site and regional roles"],
                    ["Years of Experience", "⚡ Paid", "Seniority calibration"],
                    ["Seniority Level", "✅ Yes", "C-suite vs. junior filtering"],
                    ["Open to Work (private)", "⚡ Paid", "Passive candidate discovery"],
                    ["Keywords in Posts", "✅ Yes", "Passion & expertise signals"],
                    ["Boolean Strings", "✅ Yes", "Hyper-specific targeting"],
                  ].map(([filter, free, use]) => (
                    <tr key={filter}>
                      <td className="p-4 border-b font-bold text-sm">{filter}</td>
                      <td className="p-4 border-b text-sm">{free}</td>
                      <td className="p-4 border-b text-sm">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="filter1">1. Current Company</h2>
            <p>
              Filter by where someone works right now. This is useful when you
              want to recruit from a specific competitor or find people who
              already thrive inside a particular company's culture. Pair it with
              a job title keyword to get very targeted results.
            </p>

            <h2 id="filter2">2. Past Company</h2>
            <p>
              Often overlooked, filtering by <em>past</em> company finds
              candidates who have left a desirable employer but still carry that
              experience — and are very likely open to new opportunities. This
              is one of the highest-yield sourcing tactics for senior roles.
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="flex items-center text-green-700 dark:text-green-400 font-bold mb-2">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Pro Tip
                </h4>
                <ul className="text-sm space-y-1">
                  <li>Stack "Past Company = Google" + "Current Company ≠ FAANG"</li>
                  <li>This finds ex-Google talent now at smaller firms — likely open to moves</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                <h4 className="flex items-center text-red-700 dark:text-red-400 font-bold mb-2">
                  <XCircle className="mr-2 h-4 w-4" /> Common Mistake
                </h4>
                <ul className="text-sm space-y-1">
                  <li>Only filtering by current company misses 60%+ of the addressable talent pool</li>
                </ul>
              </div>
            </div>

            <h2 id="filter3">3. School</h2>
            <p>
              University filters are useful when a role requires graduates from
              specific programs or when the hiring manager has an alumni
              preference. Also effective for entry-level hiring where
              institutional reputation signals potential.
            </p>

            <h2 id="filter4">4. Industry</h2>
            <p>
              Don't search by job title alone. Industry filters let you find
              candidates who've worked in a specific sector even when their
              title doesn't make it obvious. A "Project Manager" in
              construction and one in fintech have very different skills
              — industry disambiguates.
            </p>

            <h2 id="filter5">5. Geography</h2>
            <p>
              Always filter by location for on-site roles. Use "within 25
              miles/km" for in-office positions. For remote roles, filter by
              country or timezone region instead. LinkedIn's location data is
              self-reported, so always confirm in the outreach message.
            </p>

            <h2 id="filter6">6. Years of Experience</h2>
            <p>
              LinkedIn's "Years in current role" and "Years of experience"
              filters (available on paid plans) let you avoid over- or
              under-qualified candidates before spending time on a profile. Set
              a minimum to filter out juniors, and a maximum to avoid candidates
              who may expect compensation beyond your range.
            </p>

            <h2 id="filter7">7. Seniority Level</h2>
            <p>
              Filter by Entry, Mid, Senior, Director, VP, C-Suite, or Owner.
              This saves significant time when you specifically need someone at
              a decision-making level. Combine it with Industry for a powerful
              executive search without Sales Navigator.
            </p>

            <h2 id="filter8">8. Open to Work (The Private Signal)</h2>
            <p>
              The green "Open to Work" banner is visible publicly, but the real
              power is the filter that shows candidates who have <em>privately</em>{" "}
              signaled openness to recruiters — without the public badge. This
              surfaces passive candidates who don't want their current employer
              to see they're looking. Available on Recruiter and Sales Navigator.
            </p>

            <h2 id="filter9">9. Keywords in Posts</h2>
            <p>
              Search for people who have actively <em>posted</em> about specific
              topics. A candidate who publishes content about machine learning is
              far more engaged with the field than someone who simply lists it as
              a skill. Use the "Posts" tab in search results to filter by
              keyword-specific content authors.
            </p>

            <h2 id="filter10">10. Boolean Search Strings</h2>
            <p>
              This isn't a filter button — it's a technique. Use AND, OR, and
              NOT operators directly in LinkedIn's search bar to build precise
              queries. Example:
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              ("Product Manager" OR "PM") AND ("SaaS" OR "B2B") NOT "Intern"
            </pre>
            <p>
              Mastering boolean search alone can reduce sourcing time by 40–50%.
              It works on the free plan and is the most underused technique in
              recruiting.
            </p>

            {/* CTA */}
            <div className="bg-primary/5 border-2 border-primary/20 p-8 rounded-3xl my-12">
              <h3 className="mt-0 flex items-center">
                <Zap className="text-primary mr-2" /> Review Your Results Faster
              </h3>
              <p>
                Once your search returns 30–50 candidates, don't click through
                them one by one. Copy all their profile URLs and open them
                simultaneously with LinkedIn Bulk Opener. Review 50 profiles
                in the time it used to take to review 10.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/">Try LinkedIn Bulk Opener Free</Link>
              </Button>
            </div>

            <hr className="my-16" />

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="not-prose space-y-4">
              <div className="border p-4 rounded-lg">
                <p className="font-bold">Which filters are available for free?</p>
                <p className="text-muted-foreground text-sm">
                  Current Company, Past Company, School, Industry, Geography,
                  Seniority Level, and Boolean strings are all free. Years of
                  Experience and the private Open to Work filter require a paid
                  plan.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <p className="font-bold">Is Sales Navigator worth it just for search filters?</p>
                <p className="text-muted-foreground text-sm">
                  If you're sourcing more than 20 candidates per week, yes. The
                  additional filters, saved searches, and InMail credits pay
                  for themselves within a few successful hires.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <p className="font-bold">How accurate is LinkedIn's location data?</p>
                <p className="text-muted-foreground text-sm">
                  Location is self-reported and not always up-to-date. For
                  critical on-site roles, always confirm the candidate's current
                  location in the first outreach message.
                </p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-slate-900 text-white rounded-2xl">
              <h3 className="text-white mt-0">The Recruiter's Search Stack</h3>
              <p className="text-slate-300">
                The highest-performing recruiters in 2026 combine Boolean
                strings (free) with Geography + Seniority filters (free) to
                generate a shortlist, then use Bulk Opener to review all
                profiles at once. Add Sales Navigator's private Open to Work
                filter for passive candidates and you have a complete,
                cost-efficient sourcing machine.
              </p>
            </div>

          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogSearchFilters;