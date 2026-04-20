
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, Lock, Copy, ExternalLink, 
  Check, Shield, AlertCircle, Info
} from "lucide-react";

export function BlockchainVerificationSection() {
  const { t } = useTranslation();
  
  // Mock verification data
  const verifications = [
    { 
      id: 1, 
      title: "Annual Impact Report 2025", 
      date: "Apr 1, 2025", 
      hash: "0x7d8f...3e9b", 
      status: "verified",
      network: "Polygon"
    },
    { 
      id: 2, 
      title: "Grant Utilization Documentation", 
      date: "Mar 15, 2025", 
      hash: "0x3a5d...8f12", 
      status: "verified",
      network: "Ethereum"
    },
    { 
      id: 3, 
      title: "Volunteer Hours - Q1 2025", 
      date: "Mar 31, 2025", 
      hash: "0x9b2c...5d7a", 
      status: "processing",
      network: "Polygon"
    },
    { 
      id: 4, 
      title: "Financial Transparency Report", 
      date: "Feb 28, 2025", 
      hash: "0x2e4f...7c3b", 
      status: "verified",
      network: "Ethereum"
    },
  ];
  
  return (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">{t('Blockchain Verification')}</h2>
          <Button size="sm" className="text-xs">
            <FileCheck className="h-3.5 w-3.5 mr-1.5" />
            {t('Verify New Document')}
          </Button>
        </div>
        
        <div className="bg-accent/20 border border-border rounded-md p-3 mb-4 flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <h3 className="font-medium text-sm mb-0.5">{t('About Blockchain Verification')}</h3>
            <p className="text-xs text-muted-foreground">
              {t('Blockchain verification creates an immutable record of your impact data and reports. This provides transparency and builds trust with donors and stakeholders by ensuring data cannot be altered.')}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          {verifications.map((verification) => (
            <Card key={verification.id} className="p-3 hover:bg-accent/5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    {verification.status === 'verified' ? (
                      <Shield className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm">{verification.title}</h3>
                    <p className="text-xs text-muted-foreground">{t('Verified on')}: {verification.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className="text-[10px]">{verification.network}</Badge>
                  
                  <div className="flex items-center gap-1 bg-accent/30 px-2 py-0.5 rounded text-xs">
                    <span className="font-mono">{verification.hash}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Copy className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="text-xs">
            {t('View All Verifications')}
          </Button>
        </div>
      </div>
    </div>
  );
}
