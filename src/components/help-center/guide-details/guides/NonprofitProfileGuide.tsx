
import React from "react";

export function NonprofitProfileGuide() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Setting up your nonprofit profile</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          A complete and compelling nonprofit profile helps you attract corporate partners, 
          volunteers, and resources that align with your mission and needs.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">What you'll need:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Organization logo (SVG, PNG or JPG, at least 400x400px)</li>
            <li>Mission statement and organization description</li>
            <li>Nonprofit registration information</li>
            <li>Impact areas and UN SDG alignment</li>
            <li>Photos showcasing your work (optional but recommended)</li>
            <li>Website URL and social media links</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Step 1: Create your account</h3>
        <p className="text-gray-700 mt-2">
          Sign up on Coompass as a nonprofit organization. You'll need to provide an email
          address and create a password. After verifying your email, you'll be directed to
          complete your organization profile.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 2: Enter basic information</h3>
        <p className="text-gray-700 mt-2">
          Complete all the required fields including your organization name, founding year,
          location, size, and nonprofit registration details. This information helps us verify
          your organization and builds trust with potential partners.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 3: Upload your logo and images</h3>
        <p className="text-gray-700 mt-2">
          Upload your organization's logo. For best results, use a square image with dimensions
          of at least 400x400 pixels. You can also add photos to your gallery that showcase your
          organization's work and impact.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 4: Craft your mission statement</h3>
        <p className="text-gray-700 mt-2">
          Write a concise and compelling mission statement that clearly communicates your 
          organization's purpose and values. This is one of the first things potential 
          partners and volunteers will read, so make it impactful.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 5: Describe your organization</h3>
        <p className="text-gray-700 mt-2">
          Write a detailed description of your organization, its history, impact, and the 
          communities you serve. Be specific about the problems you're addressing and how 
          you're making a difference. Include any notable achievements or milestones.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 6: Select your impact areas</h3>
        <p className="text-gray-700 mt-2">
          Choose the UN Sustainable Development Goals (SDGs) that align with your organization's
          work. You can select up to five primary goals that will help match you with compatible
          corporate partners and volunteers.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 7: Specify your resource needs</h3>
        <p className="text-gray-700 mt-2">
          Indicate what types of resources would most benefit your organization:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Volunteer skills (e.g., marketing, design, legal)</li>
          <li>In-kind donations</li>
          <li>Corporate grants</li>
          <li>Pro bono professional services</li>
          <li>Event sponsorships</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Step 8: Add website and social links</h3>
        <p className="text-gray-700 mt-2">
          Include links to your organization's website, social media profiles, and any recent 
          impact reports or annual reports. This builds credibility and provides additional 
          ways for potential partners to learn about your work.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 9: Complete verification</h3>
        <p className="text-gray-700 mt-2">
          Submit your profile for verification. Our team will review your nonprofit status 
          and approve your account, typically within 1-2 business days. A verified badge 
          will appear on your profile, increasing trust and visibility.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
          <h4 className="font-medium text-lg mb-2 text-blue-700">Pro Tips:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>Use specific, quantifiable impact statements (e.g., "Provided clean water to 10,000+ people")</li>
            <li>Update your profile quarterly with new achievements and current needs</li>
            <li>Include testimonials from beneficiaries or previous corporate partners</li>
            <li>Be transparent about how corporate partnerships support your mission</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
