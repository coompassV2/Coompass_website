
import { Header } from "@/components/home/Header";
import { Card, CardContent } from "@/components/ui/card";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

export default function PrivacyPolicy() {
  const pageData = {
    name: "Privacy Policy",
    description: "Information on how Coompass collects and processes user data",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://coompass.org/privacy-policy"
    },
    datePublished: "2025-05-16",
    dateModified: "2025-05-16"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOManager 
        title="Privacy Policy"
        description="Coompass's privacy policy details how we collect, use, and protect your personal information when you use our platform for ESG initiatives and volunteering."
        canonicalUrl="/privacy-policy"
        keywords="privacy policy, data protection, personal information, GDPR compliance, data security, ESG platform privacy, volunteer data"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      
      <div className="bg-gray-900">
        <Header variant="light" />
      </div>
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="mb-6 mt-16">
            <h1 className="text-2xl font-bold mb-3">Privacy Policy</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 inline-block">
              <p className="text-sm text-gray-600">Last Updated: May 16, 2025</p>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold">Introduction</h2>
              <p>
                At Coompass, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              
              <h2 className="text-xl font-semibold mt-8">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the Services. This includes:
              </p>
              <ul>
                <li>Personal identifiers (name, email address, phone number)</li>
                <li>Profile information (professional background, skills, interests)</li>
                <li>Transaction information when you make donations or utilize services</li>
                <li>Communications with us and other users through our platform</li>
                <li>Usage data and analytics information</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8">How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Match volunteers with appropriate opportunities</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8">Information Sharing</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Nonprofits and companies when you express interest in volunteering or partnerships</li>
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors, such as lawyers and accountants</li>
                <li>Regulatory authorities, when required by law</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              
              <h2 className="text-xl font-semibold mt-8">Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information, such as:
              </p>
              <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: hello@coompass.org<br />
                Address: Coompass, Inc., 123 Impact Street, Lisboa 1000-123, Portugal
              </p>
              
              <p className="mt-8 text-sm text-gray-500">Last Updated: May 16, 2025</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
