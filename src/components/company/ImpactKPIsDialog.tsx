import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
interface ImpactKPIsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ImpactKPIsDialog({
  isOpen,
  onClose
}: ImpactKPIsDialogProps) {
  const {
    t
  } = useTranslation();

  // Grupo BRISA KPI data
  const kpiData = {
    collaborators: 127,
    volunteerHours: 2340,
    participationRate: 68,
    initiatives: 24
  };
  const sdgGoals = [{
    number: "3",
    text: "Good Health and Well-being",
    color: "bg-green-600"
  }, {
    number: "4",
    text: "Quality Education",
    color: "bg-red-600"
  }, {
    number: "9",
    text: "Industry, Innovation, and Infrastructure",
    color: "bg-orange-600"
  }, {
    number: "11",
    text: "Sustainable Cities and Communities",
    color: "bg-orange-500"
  }, {
    number: "13",
    text: "Climate Action",
    color: "bg-green-700"
  }, {
    number: "17",
    text: "Partnerships for the Goals",
    color: "bg-blue-600"
  }];
  const supportedCauses = ["Infrastructure Development", "Environmental Sustainability", "Road Safety Education", "Community Development"];
  const skillsLeveraged = ["Engineering", "Project Management", "Environmental Analysis", "Community Outreach", "Safety Training"];
  const socialOrganizations = ["Brisa"];
  const regionsCovered = ["Lisboa", "Porto", "Coimbra", "Faro", "Braga", "Aveiro", "Setúbal"];
  const handleDownloadPng = () => {
    console.log('Downloading PNG...');
  };
  const handleDownloadCsv = () => {
    console.log('Downloading JPG...');
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[95vh] overflow-y-auto p-0 bg-slate-900 border-slate-700">
        <div className="relative text-white">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-800 transition-colors text-white">
            <X className="h-5 w-5" />
          </button>
          
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-left space-y-2">
              <h1 className="text-2xl font-bold text-white">Grupo BRISA | Impact Hub Report</h1>
              <p className="text-slate-300">Impact Period: January 1st, 2025 – May 31st, 2025</p>
            </div>

            {/* Main KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{kpiData.collaborators}</div>
                <div className="text-sm text-slate-300">Collaborators on missions</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{kpiData.volunteerHours.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Volunteer hours provided</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{kpiData.participationRate}%</div>
                <div className="text-sm text-slate-300">Company-Wide Participation Rate</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{kpiData.initiatives}</div>
                <div className="text-sm text-slate-300">Initiatives supported</div>
              </div>
            </div>

            {/* UN SDG Goals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">UN Sustainable Development Goals Addressed (6)</h3>
              <div className="flex flex-wrap gap-3">
                {sdgGoals.map((goal, index) => <div key={index} className={`${goal.color} px-4 py-2 rounded-full text-white text-sm font-medium`}>
                    {goal.number}. {goal.text}
                  </div>)}
              </div>
            </div>

            {/* Supported Causes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Supported Causes (4)</h3>
              <div className="flex flex-wrap gap-3">
                {supportedCauses.map((cause, index) => <div key={index} className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-full text-slate-200 text-sm">
                    {cause}
                  </div>)}
              </div>
            </div>

            {/* Skills Leveraged */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Skills Leveraged from Employees (5)</h3>
              <div className="flex flex-wrap gap-3">
                {skillsLeveraged.map((skill, index) => <div key={index} className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-full text-slate-200 text-sm">
                    {skill}
                  </div>)}
              </div>
            </div>

            {/* Social Organizations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Social Organizations Partnered With (5)</h3>
              <div className="flex flex-wrap gap-3">
                {socialOrganizations.map((org, index) => <div key={index} className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-full text-slate-200 text-sm">
                    {org}
                  </div>)}
              </div>
            </div>

            {/* Regions Covered */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Regions Covered (7)</h3>
              <div className="flex flex-wrap gap-3">
                {regionsCovered.map((region, index) => <div key={index} className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-full text-slate-200 text-sm">
                    {region}
                  </div>)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 pt-4">
              <Button onClick={onClose} variant="outline" className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700">
                Close
              </Button>
              <Button onClick={handleDownloadPng} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download .png
              </Button>
              <Button onClick={handleDownloadCsv} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download .jpg
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}
