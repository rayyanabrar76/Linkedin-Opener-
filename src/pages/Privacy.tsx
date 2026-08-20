const SITE_NAME = "LinkedIn Opener Pro";
const SITE_URL = "https://profileopener.netlify.app/";
const CONTACT_EMAIL = "rayyanabrar76@gmail.com";
const EFFECTIVE_DATE = "August 19, 2026";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-4 gradient-text">{title}</h2>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">

          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <Section title="Overview">
            <p>
              {SITE_NAME} ("we", "us", or "our") operates {SITE_URL} (the "Site"). This Privacy
              Policy explains what information we collect, how we use it, and how we protect it.
              By using the Site you agree to the practices described below.
            </p>
            <p>
              If anything in this policy is unclear, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              <strong className="text-foreground">Account information:</strong> When you sign in
              with Google, we receive your name, email address, and profile picture from Google.
              This information is stored securely via Supabase and is used solely to manage your
              account.
            </p>
            <p>
              <strong className="text-foreground">Tool usage data:</strong> Any LinkedIn URLs or
              company names you paste into the tool are processed entirely in your browser and are
              never transmitted to our servers.
            </p>
            <p>
              <strong className="text-foreground">Automatically collected information:</strong>{" "}
              Our hosting provider may automatically collect standard log data including your IP
              address, browser type, operating system, pages viewed, and the date and time of
              your visit.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information collected to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Create and manage your account</li>
              <li>Respond to support requests</li>
              <li>Operate, maintain, and improve the Site</li>
              <li>Detect and prevent abuse or fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </Section>

          <Section title="Google Sign-In">
            <p>
              We use Google OAuth for authentication. When you sign in with Google, we receive
              limited profile information (name, email, profile picture) as permitted by Google's
              OAuth scopes. We do not access your Google contacts, Gmail, Google Drive, or any
              other Google services.
            </p>
            <p>
              You can revoke our access to your Google account at any time via your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Account permissions page
              </a>.
            </p>
          </Section>

          <Section title="Advertising & Google AdSense">
            <p>
              We use Google AdSense to display advertisements on our Site. This helps us keep the
              tool free for everyone.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Third party vendors, including Google, use cookies to serve ads based on a user's 
                prior visits to your website or other websites.
              </li>
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads to 
                your users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Ads Settings
                </a>.
              </li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              We use cookies and similar technologies to keep you signed in and to operate the
              Site correctly. Our third-party advertising partners (like Google AdSense) also use 
              cookies to serve personalized ads as described above.
            </p>
            <p>
              You can control cookies through your browser settings. Disabling cookies may prevent
              you from staying signed in.
            </p>
          </Section>

          <Section title="Payments">
            <p>
              Paid upgrades are handled by Lemon Squeezy, which acts as the Merchant of
              Record. When you buy an upgrade you are taken to Lemon Squeezy's checkout and
              you give your payment details to them, not to us.
            </p>
            <p className="mt-3">
              We never see or store your card number. Lemon Squeezy tells us only your email
              address and that a payment succeeded, which is what we use to unlock the paid
              features on your account. Lemon Squeezy processes your data under their own
              privacy policy at{" "}
              <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                lemonsqueezy.com/privacy
              </a>.
            </p>
          </Section>

          <Section title="Data Sharing and Disclosure">
            <p>We may share information with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-foreground">Supabase</strong> — our database and
                authentication provider, which stores your account data
              </li>
              <li>
                <strong className="text-foreground">Legal authorities</strong> — when required
                by law, court order, or to protect the safety of users or the public
              </li>
            </ul>
            <p>We do not sell or rent your personal information to any third party.</p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your account information for as long as your account is active. If you
              request deletion of your account, we will delete your personal data within 30 days,
              except where retention is required by law.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              The Site is not directed to children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you believe we have
              inadvertently collected such information, please contact us and we will promptly
              delete it.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Object to or restrict our processing of your data</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section title="Third-Party Links">
            <p>
              The Site may contain links to third-party websites, including LinkedIn and
              DuckDuckGo. We are not responsible for the privacy practices of those sites and
              encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "Effective date" at the top of this page. Continued use of the Site after any
              changes constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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

export default PrivacyPolicy;
