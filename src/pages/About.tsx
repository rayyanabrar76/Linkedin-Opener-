import { Helmet } from "react-helmet-async";

const SITE_NAME = "LinkedIn Bulk Opener";
const SITE_URL = "https://profileopener.netlify.app/"; 

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-4 gradient-text">{title}</h2>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </section>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <Helmet>
        <title>About Us | {SITE_NAME}</title>
        <meta name="description" content="Learn more about the mission and technology behind LinkedIn Bulk Opener." />
      </Helmet>

      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">About Us</h1>
            <p className="text-sm text-muted-foreground">The mission behind the tool.</p>
          </div>

          <Section title="Our Vision">
            <p>
              {SITE_NAME} was created to solve a singular problem: the "bottleneck" in modern recruitment and sales workflows. We believe that professional networking should be high-impact, but the manual tasks associated with it shouldn't be high-effort.
            </p>
          </Section>

          <Section title="Why We Built This">
            <p>
              In 2026, time is the most valuable asset for any recruiter or sales professional. We noticed that professionals spend nearly 40% of their prospecting time simply waiting for browser tabs to load and manually clicking through search results.
            </p>
            <p>
              We built this utility to bridge the gap between <strong className="text-foreground">Automation</strong> and <strong className="text-foreground">Human Review</strong>. Our tool allows you to maintain the "human touch" by reviewing profiles manually, but at a speed that traditional browsing can't match.
            </p>
          </Section>

          <Section title="Privacy & Security">
            <p>
              Unlike many other LinkedIn tools, we operate on a <strong className="text-foreground">Zero-Data footprint</strong> philosophy. 
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>We never store your URLs on our servers.</li>
              <li>We do not require your LinkedIn login credentials.</li>
              <li>All link processing happens locally within your browser.</li>
            </ul>
          </Section>

          <Section title="Our Commitment">
            <p>
              As an independent team of developers, we are committed to keeping {SITE_NAME} lightweight, fast, and free of unnecessary tracking. We continuously update our tool to ensure compatibility with the latest browser standards and LinkedIn interface updates.
            </p>
          </Section>

          <div className="border-t border-border pt-8 mt-4 text-center">
            <a href="/" className="text-primary hover:underline text-sm">
              ← Back to {SITE_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;