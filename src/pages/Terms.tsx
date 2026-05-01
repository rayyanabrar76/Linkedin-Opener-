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

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">

          {/* Header */}
          <div className="mb-10">
            <a href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to {SITE_NAME}
            </a>
            <h1 className="text-4xl font-bold gradient-text mb-2">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          {/* Intro */}
          <Section title="Agreement to Terms">
            <p>
              By accessing or using {SITE_NAME} at{" "}
              <a href={SITE_URL} className="text-primary hover:underline">{SITE_URL}</a> (the "Site"),
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree to
              these Terms, please do not use the Site.
            </p>
            <p>
              We reserve the right to update these Terms at any time. We will indicate the date of
              the most recent update at the top of this page. Your continued use of the Site after
              any changes constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="Description of Service">
            <p>
              {SITE_NAME} is a free browser-based productivity tool that allows users to open
              multiple LinkedIn company and profile URLs simultaneously, search for company
              executives, and export lead data to a spreadsheet-compatible format.
            </p>
            <p>
              The tool operates entirely within your browser. URLs and company names you enter
              are not stored on our servers. We are not affiliated with LinkedIn Corporation or
              Microsoft.
            </p>
          </Section>

          <Section title="Acceptable Use">
            <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree <strong className="text-foreground">not</strong> to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the Site in any way that violates applicable local, national, or international law or regulation</li>
              <li>
                Use the Site to scrape, harvest, or collect personal data from LinkedIn or any
                other platform in violation of that platform's terms of service
              </li>
              <li>
                Use the Site to send unsolicited communications (spam) or to harass, stalk, or
                harm any individual
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Site or its related
                systems
              </li>
              <li>Reverse-engineer, decompile, or otherwise attempt to extract the source code of the Site</li>
              <li>
                Interfere with or disrupt the integrity or performance of the Site or third-party
                services used by the Site
              </li>
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
              LinkedIn's User Agreement and applicable laws, including regulations governing data
              privacy and electronic communications (such as GDPR and CAN-SPAM).
            </p>
            <p>
              We are not responsible for any actions LinkedIn or any other third-party platform
              takes against your account as a result of your use of this tool.
            </p>
          </Section>

          {/* Required for AdSense: advertising disclosure in ToS */}
          <Section title="Advertising">
            <p>
              The Site displays advertisements served by Google AdSense and potentially other
              third-party advertising networks. These advertisements help us provide the Site free
              of charge.
            </p>
            <p>
              Advertisements are clearly labelled as such. We do not endorse any product or
              service advertised on the Site. Clicking on an advertisement will take you to a
              third-party website governed by that party's own terms and privacy policy.
            </p>
            <p>
              We are not responsible for the content, accuracy, or practices of any advertiser or
              third-party site linked from an advertisement.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on the Site — including but not limited to text, graphics, logos, and
              software — is the property of {SITE_NAME} or its content suppliers and is protected
              by applicable intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any
              content on the Site without our express written permission.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              The Site is provided on an <strong className="text-foreground">"as is" and "as available"</strong> basis
              without any warranties of any kind, either express or implied, including but not
              limited to implied warranties of merchantability, fitness for a particular purpose,
              or non-infringement.
            </p>
            <p>
              We do not warrant that the Site will be uninterrupted, error-free, or free of
              viruses or other harmful components, or that defects will be corrected.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, {SITE_NAME} and its operators
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, goodwill, or other
              intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your access to or use of (or inability to access or use) the Site</li>
              <li>Any conduct or content of any third party on or linked from the Site</li>
              <li>Unauthorised access to or alteration of your transmissions or data</li>
              <li>Any other matter relating to the Site</li>
            </ul>
            <p>
              Our total liability to you for any claim arising out of or relating to these Terms
              or your use of the Site shall not exceed USD $10.
            </p>
          </Section>

          <Section title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless {SITE_NAME} and its operators,
              affiliates, licensors, and service providers from and against any claims, liabilities,
              damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
              attorneys' fees) arising out of or relating to your violation of these Terms or your
              use of the Site.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              Your use of the Site is also governed by our{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, which
              is incorporated into these Terms by reference. Please review our Privacy Policy to
              understand our practices, including our use of Google AdSense and cookies.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              We reserve the right to suspend or terminate your access to the Site at any time,
              without notice, for conduct that we believe violates these Terms or is harmful to
              other users, us, third parties, or for any other reason at our sole discretion.
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
            <p>
              If you have any questions about these Terms, please contact us:
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

export default TermsOfService;