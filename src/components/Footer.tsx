import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">Email Finder & LinkedIn Opener</h3>
            <p className="text-sm text-muted-foreground">
              Find anyone's professional email, find CEO emails, open 100+ LinkedIn profiles in a minute, and export your leads instantly.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email Finder</li>
              <li>CEO Email Finder</li>
              <li>Bulk Profile Opening</li>
              <li>Auto-Find CEOs</li>
              <li>Export to Spreadsheet</li>
              <li>Smart URL Detection</li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="font-semibold mb-4">Blog & Guides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/best-linkedin-tools" className="hover:text-primary transition-colors">
                  Best LinkedIn Tools 2026
                </Link>
              </li>
              <li>
                <Link to="/blog/find-ceo-email-linkedin" className="hover:text-primary transition-colors">
                  Find a CEO's Email Free
                </Link>
              </li>
              <li>
                <Link to="/blog/linkedin-account-safety" className="hover:text-primary transition-colors">
                  Avoid Account Restrictions
                </Link>
              </li>
              <li>
                <Link to="/blog/linkedin-search-filters-recruiters" className="hover:text-primary transition-colors">
                  Top 10 Search Filters
                </Link>
              </li>
              <li>
                <Link to="/blog/open-multiple-linkedin-profiles" className="hover:text-primary transition-colors">
                  Open 50+ Profiles at Once
                </Link>
              </li>
              <li>
                <Link to="/blog/linkedin-vs-email-outreach" className="hover:text-primary transition-colors">
                  LinkedIn vs Email Outreach
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinkedIn Bulk Opener. Built for sales teams, recruiters, and networkers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;