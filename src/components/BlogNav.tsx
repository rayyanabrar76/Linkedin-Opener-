import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

const blogs = [
  { label: "Best LinkedIn Tools 2026", to: "/best-linkedin-tools" },
  { label: "Find a CEO's Email Free", to: "/blog/find-ceo-email-linkedin" },
  { label: "Avoid Account Restrictions", to: "/blog/linkedin-account-safety" },
  { label: "Top 10 Search Filters", to: "/blog/linkedin-search-filters-recruiters" },
  { label: "Open 50+ Profiles at Once", to: "/blog/open-multiple-linkedin-profiles" },
  { label: "LinkedIn vs Email Outreach", to: "/blog/linkedin-vs-email-outreach" },
];

const BlogNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full border-b border-border bg-muted/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* Label */}
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground whitespace-nowrap shrink-0">
            <BookOpen className="h-3.5 w-3.5" />
            More Articles:
          </span>

          {/* Divider */}
          <div className="h-4 w-px bg-border shrink-0" />

          {/* Links */}
          {blogs.map((blog) => {
            const isActive = pathname === blog.to;
            return (
              <Link
                key={blog.to}
                to={blog.to}
                className={`
                  text-xs whitespace-nowrap px-3 py-1.5 rounded-full border transition-colors shrink-0
                  ${isActive
                    ? "bg-primary text-primary-foreground border-primary font-semibold pointer-events-none"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5"
                  }
                `}
              >
                {blog.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogNav;