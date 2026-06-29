
import { Header } from "@/components/home/Header";
import { Card, CardContent } from "@/components/ui/card";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

export default function TermsConditions() {
  const pageData = {
    name: "Terms and Conditions",
    description: "Legal terms governing the use of Coompass's social impact platform",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://coompass.org/terms-conditions"
    },
    datePublished: "2026-06-01",
    dateModified: "2026-06-01"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOManager 
        title="Terms and Conditions"
        description="Read Coompass's terms and conditions to understand your rights and responsibilities when using our platform for social impact initiatives."
        canonicalUrl="/terms-conditions"
        keywords="terms and conditions, legal terms, Coompass platform, social impact, volunteering terms, user agreement"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      
      <div className="bg-gray-900">
        <Header variant="light" />
      </div>
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="mb-6 mt-16">
            <h1 className="text-2xl font-bold mb-3">Terms and Conditions of Use – Coompass</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 inline-block">
              <p className="text-sm text-gray-600">Last Updated: June 2026</p>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>Welcome to Coompass.</p>
              <p>
                Coompass is a technology infrastructure for social impact, designed to help organizations create, manage, measure, and scale social impact initiatives through a centralized digital platform.
              </p>
              <p>
                Our platform supports companies, institutions, nonprofits, universities, public entities, and communities in managing initiatives such as corporate volunteering, employee engagement, community programs, social responsibility projects, donations, partnerships, and impact reporting.
              </p>
              <p>
                These Terms and Conditions govern your access to and use of the Coompass platform, website, mobile applications, APIs, dashboards, and related services.
              </p>
              <p>By accessing or using Coompass, you agree to be bound by these Terms.</p>
              <p>If you do not agree, you must not use the platform.</p>

              <h2 className="text-xl font-semibold mt-8">2. Definitions</h2>
              <p>For the purposes of these Terms:</p>
              <p><strong>“Coompass”</strong> refers to Coompass, operated by Broadpath Lda.</p>
              <p><strong>“Platform”</strong> refers to the Coompass website, software, applications, dashboards, APIs, and related digital services.</p>
              <p><strong>“User”</strong> refers to any individual accessing or using the Platform.</p>
              <p><strong>“Organization”</strong> refers to any company, institution, nonprofit, university, public entity, or other legal entity using Coompass.</p>
              <p><strong>“Content”</strong> refers to any information, text, images, documents, metrics, reports, or materials uploaded, shared, or generated through the Platform.</p>
              <p><strong>“Services”</strong> refers to all products, functionalities, tools, and services provided by Coompass.</p>

              <h2 className="text-xl font-semibold mt-8">3. Scope of Services</h2>
              <p>Coompass provides software infrastructure for social impact operations.</p>
              <p>Our Services may include:</p>
              <ul>
                <li>Volunteer management</li>
                <li>Social impact program management</li>
                <li>Employee engagement tools</li>
                <li>Impact reporting and analytics</li>
                <li>Partnership management</li>
                <li>Donation workflows</li>
                <li>Community engagement tools</li>
                <li>AI-powered recommendations and automation</li>
              </ul>
              <p>Coompass may update, improve, modify, suspend, or discontinue features at any time.</p>

              <h2 className="text-xl font-semibold mt-8">4. Eligibility</h2>
              <p>To use Coompass, you must:</p>
              <ul>
                <li>Be at least 18 years old or legally authorized under applicable law</li>
                <li>Have authority to represent your organization when applicable</li>
                <li>Use the Platform in compliance with applicable laws</li>
              </ul>
              <p>Organizations are responsible for ensuring their employees, administrators, contractors, and users comply with these Terms.</p>

              <h2 className="text-xl font-semibold mt-8">5. Accounts and Access</h2>
              <p>Access to certain features may require account creation.</p>
              <p>Users agree to:</p>
              <ul>
                <li>Provide accurate information</li>
                <li>Maintain account confidentiality</li>
                <li>Keep login credentials secure</li>
                <li>Notify Coompass of unauthorized access</li>
              </ul>
              <p>Users are responsible for all activity under their accounts.</p>
              <p>Coompass reserves the right to suspend or terminate accounts that violate these Terms.</p>

              <h2 className="text-xl font-semibold mt-8">6. Organizational Accounts</h2>
              <p>Organizations may subscribe to Coompass under enterprise or commercial agreements.</p>
              <p>For organizational accounts:</p>
              <ul>
                <li>The contracting organization may manage users and permissions</li>
                <li>Organization administrators may access reporting and user activity relevant to service operation</li>
                <li>Organizations are responsible for internal governance and access management</li>
              </ul>
              <p>Additional contractual terms may apply under commercial agreements.</p>
              <p>In case of conflict, the commercial agreement prevails.</p>

              <h2 className="text-xl font-semibold mt-8">7. Acceptable Use</h2>
              <p>Users agree not to:</p>
              <ul>
                <li>Violate applicable laws</li>
                <li>Upload false, misleading, or fraudulent information</li>
                <li>Use the Platform for illegal activities</li>
                <li>Attempt unauthorized access to systems or accounts</li>
                <li>Disrupt or interfere with platform operations</li>
                <li>Upload malicious software or harmful code</li>
                <li>Misuse data belonging to other users or organizations</li>
              </ul>
              <p>Coompass reserves the right to investigate misuse and take appropriate action.</p>

              <h2 className="text-xl font-semibold mt-8">8. User Content</h2>
              <p>Users and organizations retain ownership of the content they upload to Coompass.</p>
              <p>
                By uploading content, you grant Coompass a limited, non-exclusive license to store, process, display, and use such content solely to operate and improve the Services.
              </p>
              <p>Users are solely responsible for content they upload.</p>
              <p>You represent that:</p>
              <ul>
                <li>You own or control required rights</li>
                <li>Your content does not violate laws or third-party rights</li>
              </ul>
              <p>Coompass is not responsible for user-generated content.</p>

              <h2 className="text-xl font-semibold mt-8">9. Data Protection and Privacy</h2>
              <p>Coompass processes personal data in accordance with applicable privacy laws, including GDPR.</p>
              <p>Personal data may include:</p>
              <ul>
                <li>Name</li>
                <li>Email</li>
                <li>Employment data</li>
                <li>Participation data</li>
                <li>Volunteer activity</li>
                <li>Impact metrics</li>
              </ul>
              <p>Data is processed for:</p>
              <ul>
                <li>Service delivery</li>
                <li>Analytics and reporting</li>
                <li>Platform security</li>
                <li>Customer support</li>
                <li>Product improvement</li>
              </ul>
              <p>For more information, please refer to the Coompass Privacy Policy.</p>

              <h2 className="text-xl font-semibold mt-8">10. Intellectual Property</h2>
              <p>All intellectual property rights related to Coompass remain the exclusive property of Coompass or its licensors.</p>
              <p>This includes:</p>
              <ul>
                <li>Software</li>
                <li>Branding</li>
                <li>Logos</li>
                <li>Designs</li>
                <li>Dashboards</li>
                <li>Analytics systems</li>
                <li>AI models and workflows</li>
              </ul>
              <p>Users may not copy, distribute, reverse engineer, or reproduce any part of the Platform without written authorization.</p>

              <h2 className="text-xl font-semibold mt-8">11. Third-Party Integrations</h2>
              <p>Coompass may integrate with third-party tools or services, including:</p>
              <ul>
                <li>Authentication providers</li>
                <li>Calendar systems</li>
                <li>Communication platforms</li>
                <li>Analytics tools</li>
                <li>Payment providers</li>
              </ul>
              <p>Coompass is not responsible for third-party services or their availability.</p>
              <p>Use of third-party services may be subject to separate terms.</p>

              <h2 className="text-xl font-semibold mt-8">12. Service Availability</h2>
              <p>Coompass aims to provide reliable and secure access to the Platform.</p>
              <p>However, Services are provided on an “as available” basis.</p>
              <p>We do not guarantee uninterrupted, error-free, or continuous availability.</p>
              <p>Maintenance, upgrades, security events, or external disruptions may affect service availability.</p>

              <h2 className="text-xl font-semibold mt-8">13. Fees and Payments</h2>
              <p>Certain Services require payment under subscription, licensing, setup, or enterprise agreements.</p>
              <p>Users and organizations agree to pay all applicable fees according to agreed commercial terms.</p>
              <p>Failure to pay may result in suspension or termination of access.</p>
              <p>Unless otherwise agreed, fees are non-refundable.</p>

              <h2 className="text-xl font-semibold mt-8">14. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Coompass shall not be liable for:</p>
              <ul>
                <li>Indirect damages</li>
                <li>Loss of revenue</li>
                <li>Loss of profits</li>
                <li>Loss of business opportunities</li>
                <li>Loss of data</li>
                <li>Reputational damages</li>
              </ul>
              <p>Coompass does not guarantee:</p>
              <ul>
                <li>Specific business outcomes</li>
                <li>Participation levels</li>
                <li>Volunteer engagement results</li>
                <li>Social impact performance</li>
              </ul>
              <p>Organizations remain solely responsible for their programs, initiatives, and impact claims.</p>

              <h2 className="text-xl font-semibold mt-8">15. Disclaimer</h2>
              <p>Coompass acts solely as a software and infrastructure provider.</p>
              <p>Coompass does not directly manage, supervise, validate, or guarantee:</p>
              <ul>
                <li>Volunteer missions</li>
                <li>Social projects</li>
                <li>Donations</li>
                <li>External partnerships</li>
                <li>Third-party initiatives</li>
              </ul>
              <p>Responsibility for these activities remains with participating organizations and users.</p>

              <h2 className="text-xl font-semibold mt-8">16. Suspension and Termination</h2>
              <p>Coompass may suspend or terminate access if:</p>
              <ul>
                <li>These Terms are violated</li>
                <li>Fraud or abuse is detected</li>
                <li>Required payments are not made</li>
                <li>Security risks arise</li>
              </ul>
              <p>Users may stop using the Platform at any time.</p>
              <p>Termination does not remove obligations accrued before termination.</p>

              <h2 className="text-xl font-semibold mt-8">17. Governing Law</h2>
              <p>These Terms are governed by the laws of Portugal.</p>
              <p>Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of Portuguese courts.</p>

              <h2 className="text-xl font-semibold mt-8">18. Changes to Terms</h2>
              <p>Coompass may update these Terms at any time.</p>
              <p>Updated versions become effective upon publication on the Platform.</p>
              <p>Continued use after updates constitutes acceptance of revised Terms.</p>

              <h2 className="text-xl font-semibold mt-8">19. Contact Information</h2>
              <p>Coompass</p>
              <p>Operated by Broadpath Lda.</p>
              <p>NIF: 518268225</p>
              <p>Registered Office: Rua Guilhermina Suggia, Cascais</p>
              <p>
                Email: <a href="mailto:hello@coompass.org" className="text-blue-600 hover:underline">hello@coompass.org</a>
              </p>
              <p>
                Website: <a href="https://www.coompass.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coompass.org</a>
              </p>

              <p className="mt-8 text-sm text-gray-500">Last Updated: June 2026</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
