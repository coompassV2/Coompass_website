
import React from "react";

export function DashboardCustomizationGuide() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Customization</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Customize your Coompass dashboard to focus on the metrics and information most relevant to your company's impact goals.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Before you begin:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Complete your company profile setup</li>
            <li>Define your impact goals and focus areas</li>
            <li>Have administrator access to your company account</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Step 1: Access dashboard settings</h3>
        <p className="text-gray-700 mt-2">
          Navigate to your company dashboard and click the "Customize Dashboard" button in the top-right corner. 
          This will open the dashboard customization panel.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 2: Select key performance indicators</h3>
        <p className="text-gray-700 mt-2">
          In the "KPI Selection" tab, choose which metrics you want to display on your dashboard. 
          Options include volunteer hours, participation rates, impact scores, and SDG alignment. 
          You can select up to 6 KPIs to display prominently.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Step 3: Arrange dashboard widgets</h3>
        <p className="text-gray-700 mt-2">
          Use drag-and-drop functionality to arrange the position and size of widgets on your dashboard.
          Click and hold any widget to move it, or grab the corner to resize it. The dashboard uses a 
          responsive grid system that will adapt to different screen sizes.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 4: Configure chart preferences</h3>
        <p className="text-gray-700 mt-2">
          For each chart or graph on your dashboard, click the settings icon to configure:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Time period (weekly, monthly, quarterly, yearly)</li>
          <li>Chart type (bar, line, pie, area)</li>
          <li>Data filtering options</li>
          <li>Color schemes and labels</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Step 5: Add custom sections</h3>
        <p className="text-gray-700 mt-2">
          Click the "Add Widget" button to include additional sections on your dashboard:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Recent activities feed</li>
          <li>Employee leaderboard</li>
          <li>Upcoming missions</li>
          <li>Partnership highlights</li>
          <li>Custom notes or announcements</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Step 6: Set default views</h3>
        <p className="text-gray-700 mt-2">
          Configure different dashboard views for various user roles in your organization. 
          For example, executives might see high-level impact metrics, while CSR managers 
          might see more detailed volunteer participation data.
        </p>

        <h3 className="text-xl font-semibold mt-6">Step 7: Save and share your dashboard</h3>
        <p className="text-gray-700 mt-2">
          Click "Save Changes" to apply your customizations. You can also create saved dashboard 
          configurations that can be accessed via the "Dashboard Views" dropdown. 
          Share specific views with team members by generating a shareable link.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
          <h4 className="font-medium text-lg mb-2 text-blue-700">Pro Tips:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>Review your dashboard monthly to ensure it reflects your current priorities</li>
            <li>Use the "Export" feature to download dashboard data for reports and presentations</li>
            <li>Set up automated email reports of key dashboard metrics</li>
            <li>Create separate dashboard views for different stakeholder presentations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
