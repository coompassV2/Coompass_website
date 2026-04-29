
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Edit } from "lucide-react";
import { Recognition } from "./types";
import { useRecognitionUtils } from "./utils";

interface RecentAwardsTableProps {
  allRecognitions: Recognition[];
  onViewCertificate: (recognition: Recognition) => void;
  onReviewNomination: (recognition: Recognition) => void;
}

export function RecentAwardsTable({
  allRecognitions,
  onViewCertificate,
  onReviewNomination
}: RecentAwardsTableProps) {
  const { t } = useTranslation();
  const { getStatusBadge } = useRecognitionUtils();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Recent Awards & Nominations')}</CardTitle>
        <CardDescription>{t('Latest activity across all recognition programs')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Program')}</TableHead>
              <TableHead>{t('Volunteer')}</TableHead>
              <TableHead>{t('Date')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              <TableHead className="text-right">{t('Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allRecognitions.map((recognition) => (
              <TableRow key={recognition.id}>
                <TableCell className="font-medium">{t(recognition.awardName)}</TableCell>
                <TableCell>{recognition.volunteer}</TableCell>
                <TableCell>{recognition.date}</TableCell>
                <TableCell>{getStatusBadge(recognition.status)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      if (recognition.status === 'awarded') {
                        onViewCertificate(recognition);
                      } else {
                        onReviewNomination(recognition);
                      }
                    }}
                  >
                    {recognition.status === 'awarded' ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        {t('View Certificate')}
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        {t('Review')}
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
