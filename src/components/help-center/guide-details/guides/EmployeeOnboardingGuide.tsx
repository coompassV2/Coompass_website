
import React from "react";

export function EmployeeOnboardingGuide() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee onboarding</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Effectively onboarding your employees to Coompass is crucial for maximizing participation
          and engagement in your company's volunteering and social impact initiatives.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Before you begin:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Make sure your company profile is complete</li>
            <li>Determine your volunteer program structure and policies</li>
            <li>Identify team leads or volunteer champions</li>
            <li>Prepare internal communications about the program</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Step 1: Navigate to Employee Management</h3>
        <p className="text-gray-700 mt-2">
          From your company dashboard, go to the "Employees" section in the left sidebar menu.
          Here you'll find tools to invite and manage your team members.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 2: Invite employees</h3>
        <p className="text-gray-700 mt-2">
          Click the "Invite Employees" button and choose between individual invitations
          or bulk upload via CSV file. For individual invites, enter the employee's name
          and email address. For bulk uploads, download our template CSV, add your employees'
          information, and upload the completed file.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 3: Customize invitation message</h3>
        <p className="text-gray-700 mt-2">
          Personalize the invitation email that employees will receive. Explain the purpose
          of Coompass, how it aligns with company values, and the benefits of participation.
          You can use our template or create your own message.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 4: Set permission levels</h3>
        <p className="text-gray-700 mt-2">
          Assign appropriate roles to each employee:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><span className="font-semibold">Admin:</span> Full access to company settings, reporting, and employee management</li>
          <li><span className="font-semibold">Manager:</span> Can create missions, approve hours, and view team reports</li>
          <li><span className="font-semibold">Volunteer:</span> Standard access to browse, join, and track personal volunteering</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Step 5: Send invitations</h3>
        <p className="text-gray-700 mt-2">
          Review your invitation list and permission settings, then click "Send Invitations."
          Employees will receive an email with instructions to create their accounts and join
          your company's Coompass platform.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 6: Monitor activation</h3>
        <p className="text-gray-700 mt-2">
          Track which employees have activated their accounts in the "Pending Activations" tab.
          You can resend invitations to those who haven't joined after a week.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 7: Host an onboarding session</h3>
        <p className="text-gray-700 mt-2">
          Schedule a brief training session to walk employees through the platform features,
          demonstrate how to join missions, and answer any questions. You can use our
          prepared onboarding presentation or create your own.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
          <h4 className="font-medium text-lg mb-2 text-blue-700">Pro Tips:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>Start with a pilot group of enthusiastic volunteers before company-wide rollout</li>
            <li>Create a few missions before inviting employees so they have immediate opportunities</li>
            <li>Consider incentives for early adopters and active participants</li>
            <li>Schedule regular check-ins to gather feedback and improve your program</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
