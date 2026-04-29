
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useOrganizations } from "@/hooks/useOrganizations";

export function PartnershipAnalytics() {
  const { t } = useTranslation();
  const { getPartnerOrganizations } = useOrganizations();

  // Get partner organizations
  const partners = getPartnerOrganizations();

  // Calculate partnership types based on organization data
  const partnershipTypeData = calculatePartnershipTypes(partners);

  // Calculate impact stats
  const impactStats = [
    {
      label: t('Total Partnerships'),
      value: partners.length
    },
    {
      label: t('Active Partnerships'),
      value: partners.length
    },
    {
      label: t('Total Volunteer Hours'),
      value: calculateTotalHours(partners)
    },
    {
      label: t('Ongoing Missions'),
      value: calculateActiveMissions(partners)
    }
  ];

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-xl font-semibold">{t('Partnership Analytics')}</h2>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">{t('Partnership Types')}</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={partnershipTypeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {partnershipTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right" 
              iconType="circle" 
              iconSize={8} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">{t('Impact Stats')}</h3>
        <div className="grid grid-cols-2 gap-4">
          {impactStats.map((stat, index) => (
            <Card key={index} className="p-4 bg-foreground/5">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xl font-semibold mt-2">{stat.value}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate partnership types
function calculatePartnershipTypes(partners: any[]) {
  // Default data if no partners
  if (partners.length === 0) {
    return [
      { name: 'Strategic', value: 0, color: '#10B981' },
      { name: 'Project-based', value: 0, color: '#3B82F6' },
      { name: 'Regular', value: 0, color: '#8B5CF6' },
      { name: 'Occasional', value: 0, color: '#EC4899' }
    ];
  }

  // Base distribution - in a real app this would be calculated from actual data
  const strategicCount = Math.floor(partners.length * 0.4);
  const projectBasedCount = Math.floor(partners.length * 0.3);
  const regularCount = Math.floor(partners.length * 0.2);
  const occasionalCount = Math.max(1, partners.length - strategicCount - projectBasedCount - regularCount);

  return [
    { name: 'Strategic', value: strategicCount, color: '#10B981' },
    { name: 'Project-based', value: projectBasedCount, color: '#3B82F6' },
    { name: 'Regular', value: regularCount, color: '#8B5CF6' },
    { name: 'Occasional', value: occasionalCount, color: '#EC4899' }
  ];
}

// Helper function to calculate total volunteer hours
function calculateTotalHours(partners: any[]) {
  // Base calculation - in a real app this would be from actual data
  const baseHoursPerPartner = 100;
  const variableHours = 50;
  
  return partners.reduce((total, partner) => {
    // Use active missions as a multiplier for hours
    const partnerHours = baseHoursPerPartner + (partner.activeMissions || 1) * Math.floor(Math.random() * variableHours);
    return total + partnerHours;
  }, 0);
}

// Helper function to calculate active missions
function calculateActiveMissions(partners: any[]) {
  return partners.reduce((total, partner) => {
    return total + (partner.activeMissions || 1);
  }, 0);
}
