const SITE_NAME = "LinkedIn Opener Pro";
const SITE_URL = "https://profileopener.netlify.app/";
const CONTACT_EMAIL = "hassanabrar2022@gmail.com";
const EFFECTIVE_DATE = "June 18, 2026";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-4 gradient-text">{title}</h2>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </section>
);

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">

          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Refund Policy</h1>
            <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <Section title="Overview">
            <p>
              At {SITE_NAME}, we want you to be completely satisfied with your purchase. This
              Refund Policy explains when and how you can request a refund for your Pro access
              purchase.
            </p>
          </Section>

          <Section title="7-Day Money Back Guarantee">
            <p>
              We offer a full refund within <strong className="text-foreground">7 days</strong> of
              your purchase, no questions asked. If you are not satisfied with your Pro access
              for any reason, contact us within 7 days of your purchase date and we will issue
              a full refund.
            </p>
          </Section>

          <Section title="How to Request a Refund">
            <p>To request a refund:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></li>
              <li>Include the email address you used to purchase</li>
              <li>Include your order number if available</li>
              <li>We will process your refund within 3-5 business days</li>
            </ul>
          </Section>

          <Section title="Refund Eligibility">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Refund requests must be made within 7 days of purchase</li>
              <li>Refund requests after 7 days will not be accepted</li>
              <li>Only one refund per customer</li>
            </ul>
          </Section>

          <Section title="Payment Processing">
            <p>
              All payments are processed by Paddle.com. Refunds will be returned to the original
              payment method used at the time of purchase. Processing times may vary depending
              on your bank or card issuer.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about our refund policy, please contact us:</p>
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <strong className="text-foreground">Website:</strong>{" "}
              <a href={SITE_URL} className="text-primary hover:underline">
                {SITE_URL}
              </a>
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

export default RefundPolicy;
