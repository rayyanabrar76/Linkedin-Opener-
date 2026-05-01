const SITE_NAME = "LinkedIn Bulk Opener";
const SITE_URL = "https://profileopener.netlify.app/"; // ← update to your actual domain
const CONTACT_EMAIL = "rayyanabrar76@gmail.com"; // ← update
const EFFECTIVE_DATE = "May 1, 2025";

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

          {/* Header */}
          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          {/* Intro */}
          <Section title="Overview">
            <p>
              {SITE_NAME} ("we", "us", or "our") operates {SITE_URL} (the "Site"). This Privacy
              Policy explains how we collect, use, and share information when you visit our Site.
              By using the Site you agree to the practices described below.
            </p>
            <p>
              We are committed to transparency. If anything in this policy is unclear, please
              contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              <strong className="text-foreground">Information you provide:</strong> We do not
              require you to create an account or submit personal details to use the Site. Any
              LinkedIn URLs or company names you paste into the tool are processed entirely in
              your browser and are never transmitted to our servers.
            </p>
            <p>
              <strong className="text-foreground">Automatically collected information:</strong>{" "}
              Like most websites, our hosting provider and analytics services automatically collect
              standard log data when you visit, including your IP address, browser type, operating
              system, referring URLs, pages viewed, and the date and time of your visit.
            </p>
            <p>
              <strong className="text-foreground">Cookies and similar technologies:</strong> We
              and our third-party partners (including Google) use cookies, web beacons, and similar
              tracking technologies to operate the Site, measure traffic, and serve relevant
              advertisements. See the "Advertising" section below for full details.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information collected to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Operate, maintain, and improve the Site</li>
              <li>Understand how visitors use the Site (analytics)</li>
              <li>Display advertisements through Google AdSense</li>
              <li>Detect and prevent abuse or fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
          </Section>

          {/* ── AdSense-Required Disclosure ── */}
          <Section title="Advertising — Google AdSense">
            <p>
              We use Google AdSense to display advertisements on this Site. Google AdSense is a
              third-party advertising service provided by Google LLC. Google uses cookies to
              serve ads based on your prior visits to this Site and other sites on the internet.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads to you
              based on your visit to our Site and/or other sites on the Internet. You may opt out
              of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>{" "}
              or by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.aboutads.info
              </a>.
            </p>
            <p>
              For more information on how Google collects and processes data, please review
              Google's Privacy Policy at{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                policies.google.com/privacy
              </a>.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's
              prior visits to our Site or to other websites. The use of advertising cookies by
              Google enables Google and its partners to serve ads based on your visit here and
              elsewhere on the internet.
            </p>
          </Section>

          <Section title="Analytics">
            <p>
              We may use Google Analytics or similar services to understand how visitors interact
              with the Site. These services collect information such as how often users visit,
              which pages they visit, and what other sites they visited before coming to our Site.
              We use this data only to improve the Site. Google Analytics collects only the IP
              address assigned to you on the date you visit, not your name or other identifying
              information.
            </p>
            <p>
              You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Cookies are small text files stored on your device by your browser. We use cookies
              to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Keep the Site functioning correctly</li>
              <li>Measure site traffic and usage patterns</li>
              <li>Serve relevant advertisements via Google AdSense</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect
              the functionality of the Site and the relevance of advertisements shown to you.
            </p>
          </Section>

          <Section title="Data Sharing and Disclosure">
            <p>We may share information with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-foreground">Service providers</strong> — hosting, analytics,
                and advertising partners (e.g., Google) that help us operate the Site
              </li>
              <li>
                <strong className="text-foreground">Legal authorities</strong> — when required by
                law, court order, or to protect the safety of our users or the public
              </li>
              <li>
                <strong className="text-foreground">Business transfers</strong> — in the event of a
                merger, acquisition, or sale of assets, your information may be transferred
              </li>
            </ul>
            <p>We do not sell or rent your personal information to any third party for marketing purposes.</p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              The Site is not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe we have inadvertently
              collected such information, please contact us and we will promptly delete it.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Opt out of personalised advertising (see the Advertising section above)</li>
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
              "Effective date" at the top of this page. We encourage you to review this policy
              periodically. Continued use of the Site after any changes constitutes your acceptance
              of the updated policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
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