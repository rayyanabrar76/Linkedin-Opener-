import { Helmet } from "react-helmet-async";

const SITE_NAME = "LinkedIn Bulk Opener";
const CONTACT_EMAIL = "rayyanabrar76@gmail.com";
const SITE_URL = "https://profileopener.netlify.app/";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-4 gradient-text">{title}</h2>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </section>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <Helmet>
        <title>Contact Us | {SITE_NAME}</title>
        <meta name="description" content="Get in touch with the LinkedIn Bulk Opener team for support, feedback, or business inquiries." />
      </Helmet>

      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Contact Us</h1>
            <p className="text-sm text-muted-foreground">We’re here to help.</p>
          </div>

          <Section title="Get in Touch">
            <p>
              Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </Section>

          <Section title="Support & Inquiries">
            <p>
              <strong className="text-foreground">General Support:</strong> For technical issues or help using the tool, please reach out to us at:
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-medium">{CONTACT_EMAIL}</a>
            </p>
            <p>
              <strong className="text-foreground">Feature Requests:</strong> Have an idea on how we can make {SITE_NAME} even better? We love hearing from our users! Send your suggestions to our support email.
            </p>
          </Section>

          <Section title="Business & Partnerships">
            <p>
              For business inquiries, collaboration opportunities, or media requests, please contact our lead developer directly at <strong className="text-foreground">{CONTACT_EMAIL}</strong>.
            </p>
          </Section>

          <Section title="Response Time">
            <p>
              We are a small, dedicated team. We typically respond to all inquiries within <strong className="text-foreground">24 to 48 business hours</strong>. To help us assist you faster, please include as much detail as possible in your initial message.
            </p>
          </Section>

          <div className="border-t border-border pt-8 mt-4 text-center">
            <p className="text-xs text-muted-foreground mb-4 italic">
              Official Site: <a href={SITE_URL} className="hover:text-primary">{SITE_URL}</a>
            </p>
            <a href="/" className="text-primary hover:underline text-sm">
              ← Back to {SITE_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;