
import React from "react";

export function VerificationGuide() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verifying your organization</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Organization verification on Coompass establishes trust with potential corporate 
          partners and volunteers, increasing your visibility and credibility on the platform.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">What you'll need:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Proof of nonprofit status (registration documents)</li>
            <li>Official organization identification number</li>
            <li>Organization contact information that matches public records</li>
            <li>Access to your organization's official email domain</li>
            <li>Authorization to represent the organization</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Step 1: Complete your profile</h3>
        <p className="text-gray-700 mt-2">
          Before beginning verification, ensure your organization's profile is complete with 
          accurate information, including your legal name, address, mission statement, and 
          website. Verification requires review of this information against official records.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 2: Request verification</h3>
        <p className="text-gray-700 mt-2">
          Navigate to your organization profile settings and find the "Request Verification" 
          button. This will begin the verification process and display a form requesting the 
          necessary documentation.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 3: Submit required documentation</h3>
        <p className="text-gray-700 mt-2">
          Upload the following documentation:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Nonprofit registration certificate or equivalent legal document</li>
          <li>Tax exemption determination letter (if applicable in your country)</li>
          <li>Official identification of the authorized representative submitting the verification</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Step 4: Domain verification</h3>
        <p className="text-gray-700 mt-2">
          Verify ownership of your organization's domain by responding to an email sent to an 
          address at your official domain, or by adding a verification code to your website. 
          This step confirms that you legitimately represent the organization.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 5: Phone verification</h3>
        <p className="text-gray-700 mt-2">
          Provide a contact phone number registered to your organization. Our verification team 
          may call this number to confirm details and speak with a representative about your 
          organization's work.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 6: Await review</h3>
        <p className="text-gray-700 mt-2">
          Our verification team will review your submission within 1-3 business days. During this 
          period, your profile will display a "Verification Pending" status. You'll receive email 
          updates about the progress of your verification.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 7: Address any follow-up requests</h3>
        <p className="text-gray-700 mt-2">
          If our team needs additional documentation or clarification, you'll receive specific 
          instructions via email. Respond promptly to these requests to avoid delays in the 
          verification process.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 8: Receive verification badge</h3>
        <p className="text-gray-700 mt-2">
          Once verification is complete, your organization profile will display a verification 
          badge, indicating to corporate partners and volunteers that your organization has been 
          vetted and confirmed as legitimate by Coompass.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
          <h4 className="font-medium text-lg mb-2 text-blue-700">Pro Tips:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>Submit clear, legible scans or photos of all documentation</li>
            <li>Ensure the email address used for your Coompass account can receive verification communications</li>
            <li>Have a secondary contact person available in case additional verification is needed</li>
            <li>Verification needs to be renewed annually to maintain your verified status</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
