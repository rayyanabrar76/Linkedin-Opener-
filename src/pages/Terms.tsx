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

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">

          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <Section title="Agreement to Terms">
            <p>
              By accessing or using {SITE_NAME} at{" "}
              <a href={SITE_URL} className="text-primary hover:underline">{SITE_URL}</a> (the "Site"),
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree,
              please do not use the Site.
            </p>
            <p>
              We reserve the right to update these Terms at any time. Your continued use of the
              Site after any changes constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="Description of Service">
            <p>
              {SITE_NAME} is a browser-based productivity tool that allows users to open multiple
              LinkedIn company and profile URLs simultaneously, search for company executives, and
              export lead data to a spreadsheet. The Site is provided for free and is supported by advertising.
            </p>
            <p>
              The tool operates within your browser. URLs and company names you enter are not
              stored on our servers. We are not affiliated with LinkedIn Corporation or Microsoft.
            </p>
          </Section>

          <Section title="Accounts and Registration">
            <p>
              To access certain features, you may need to create an account by signing in with Google. You
              are responsible for maintaining the security of your account and for all activity
              that occurs under it.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </Section>

          <Section title="Acceptable Use">
            <p>You agree to use the Site only for lawful purposes. You agree <strong className="text-foreground">not</strong> to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the Site in violation of any applicable law or regulation</li>
              <li>Use the Site to scrape, harvest, or collect personal data in violation of any platform's terms of service</li>
              <li>Use the Site to send unsolicited communications or to harass any individual</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
              <li>Reverse-engineer or extract the source code of the Site</li>
              <li>Interfere with or disrupt the integrity or performance of the Site</li>
              <li>Use ad-blockers in a manner that bypasses or interferes with the economic model of the Site, although we respect your right to use them.</li>
            </ul>
          </Section>

          <Section title="LinkedIn and Third-Party Platforms">
            <p>
              {SITE_NAME} automates the opening of URLs and performs DuckDuckGo searches on your
              behalf. It does not log into LinkedIn, bypass authentication, or interact with
              LinkedIn's API. All actions occur in new browser tabs controlled entirely by you.
            </p>
            <p>
              You are solely responsible for ensuring that your use of this tool complies with
              LinkedIn's User Agreement and all applicable laws, including data privacy regulations
              such as GDPR and CAN-SPAM.
            </p>
            <p>
              We are not responsible for any actions LinkedIn or any other third-party platform
              takes against your account as a result of your use of this tool.
            </p>
          </Section>

          <Section title="Purchases and Payment">
            <p>
              Paid upgrades are sold through Lemon Squeezy, who act as the Merchant of Record
              for every order. Your contract for the purchase is with Lemon Squeezy, and they
              handle payment, receipts, and any sales tax or VAT that applies where you live.
            </p>
            <p className="mt-3">
              An upgrade is a one-time payment for a single user, not a subscription. Nothing
              recurs and nothing is charged again unless you buy again. Access is unlocked on
              the account belonging to the email address used at checkout, so please use the
              same address you sign in with.
            </p>
            <p className="mt-3">
              Refunds are covered by our refund policy. If an order is refunded or reversed,
              access to the paid features ends.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on the Site — including text, graphics, logos, and software — is the
              property of {SITE_NAME} or its content suppliers and is protected by applicable
              intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any
              content on the Site without our express written permission.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              The Site is provided on an{" "}
              <strong className="text-foreground">"as is" and "as available"</strong> basis without
              any warranties of any kind, either express or implied, including but not limited to
              warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that the Site will be uninterrupted, error-free, or that CEO
              search results will be accurate or complete.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, {SITE_NAME} and its operators
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including loss of profits, data, or goodwill, resulting from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your access to or use of (or inability to access or use) the Site</li>
              <li>Any conduct or content of any third party on or linked from the Site</li>
              <li>Unauthorised access to or alteration of your data</li>
              <li>Any other matter relating to the Site</li>
            </ul>
          </Section>

          <Section title="Indemnification">
            <p>
              You agree to indemnify and hold harmless {SITE_NAME} and its operators from any
              claims, liabilities, damages, or costs (including reasonable attorneys' fees) arising
              out of your violation of these Terms or your use of the Site.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              Your use of the Site is also governed by our{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, which
              is incorporated into these Terms by reference.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              We reserve the right to suspend or terminate your access to the Site at any time,
              without notice, for conduct that we believe violates these Terms or is harmful to
              other users, us, or third parties.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any dispute arising under these Terms shall be resolved in the competent courts of
              the jurisdiction in which we operate.
            </p>
          </Section>

          <Section title="Severability">
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that
              provision will be limited or eliminated to the minimum extent necessary so that the
              remaining Terms remain in full force and effect.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfService;
