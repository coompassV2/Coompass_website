
import React from "react";

export function CompanyProfileGuide() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Setting up your company profile</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          A complete and optimized company profile helps you attract the right nonprofit partners
          and showcase your company's commitment to social impact.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">What you'll need:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Company logo (SVG, PNG or JPG, at least 400x400px)</li>
            <li>Company description (250-500 words recommended)</li>
            <li>Impact goals and mission statement</li>
            <li>Industry sector and company size information</li>
            <li>Website URL and social media links</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Step 1: Access your profile settings</h3>
        <p className="text-gray-700 mt-2">
          Navigate to "Company Settings" from the left sidebar menu or click on your profile image
          in the top right corner and select "Edit Profile" from the dropdown menu.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 2: Upload your company logo</h3>
        <p className="text-gray-700 mt-2">
          Click on the image upload area and select your company logo. The system will automatically
          resize your image, but for best results, use a square image with dimensions of at least 400x400 pixels.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 3: Complete company information</h3>
        <p className="text-gray-700 mt-2">
          Fill in all the required fields including company name, industry, company size, 
          year founded, and headquarters location. The more complete your profile, the 
          better matches you'll receive for partnerships.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 4: Write your company description</h3>
        <p className="text-gray-700 mt-2">
          Create a compelling description that highlights your company's values, mission, 
          and approach to social impact. Explain why your company is interested in 
          partnering with nonprofits and what unique value you bring to these partnerships.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 5: Set your impact goals</h3>
        <p className="text-gray-700 mt-2">
          Select the UN Sustainable Development Goals (SDGs) that align with your company's
          mission and impact strategy. You can select up to five primary goals that will 
          help match you with compatible nonprofit organizations.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 6: Add website and social links</h3>
        <p className="text-gray-700 mt-2">
          Include links to your company website, LinkedIn page, and other relevant social 
          media profiles. This builds credibility and allows potential partners to learn more about your work.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 7: Preview and publish</h3>
        <p className="text-gray-700 mt-2">
          Review all the information you've entered, make any necessary adjustments, 
          and click "Save Changes" to publish your profile. Your profile is now visible
          to nonprofit organizations looking for corporate partners.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
          <h4 className="font-medium text-lg mb-2 text-blue-700">Pro Tips:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>Update your profile quarterly to reflect new initiatives and impact achievements</li>
            <li>Include specific examples of past partnership successes if available</li>
            <li>Mention your volunteer program structure and employee engagement goals</li>
            <li>Be transparent about your budget ranges for corporate social responsibility initiatives</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
