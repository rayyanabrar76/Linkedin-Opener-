import React from "react";
import { ClipboardPaste, Mail, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    title: "Step 1: Paste Your List",
    description:
      "Copy and paste company names, LinkedIn URLs, or website links into the text box. Mix and match any format - the tool automatically detects what you've entered.",
  },
  {
    icon: Mail,
    title: "Step 2: Find Emails, CEOs & Open Profiles",
    description:
      "Click 'Find Email' to search for anyone's professional email, or 'CEO Email' to find a company's CEO email in one click. You can also 'Open All' profiles or 'Find CEOs' on LinkedIn. Make sure your popup blocker is disabled.",
  },
  {
    icon: Download,
    title: "Step 3: Export Your Leads",
    description:
      "Click 'Export Excel' to download a spreadsheet with all your data - company names, websites, LinkedIn pages, CEO profiles, and email search links ready for Excel & Google Sheets.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section
      id="howitworks"
      className="px-4 py-20 pb-32 bg-gradient-to-b from-secondary/10 to-background scroll-mt-24"
    >
      <div className="container mx-auto max-w-5xl text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          How It Works
        </h2>
        {/* Subheading */}
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-12">
          Three simple steps to find emails and open LinkedIn profiles
        </p>

        {/* Steps */}
        <div className="space-y-12 text-left">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-6 items-start group">
                <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-inherit" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tip */}
        <div className="mt-16 p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            💡 <strong>Pro Tip:</strong> Use the preview panel on the right to verify all your links before opening.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;