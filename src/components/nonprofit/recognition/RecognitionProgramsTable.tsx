
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Edit, Trash2 } from "lucide-react";
import { RecognitionProgram } from "./types";
import { useRecognitionUtils } from "./utils";
import { formatDatePt } from "@/lib/dateFormat";

interface RecognitionProgramsTableProps {
  recognitionPrograms: RecognitionProgram[];
  onNominateForProgram: (program: RecognitionProgram) => void;
  onEditProgram: (program: RecognitionProgram) => void;
  onDeleteProgram: (program: RecognitionProgram) => void;
}

export function RecognitionProgramsTable({
  recognitionPrograms,
  onNominateForProgram,
  onEditProgram,
  onDeleteProgram
}: RecognitionProgramsTableProps) {
  const { t } = useTranslation();
  const { getFrequencyLabel } = useRecognitionUtils();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Recognition Programs')}</CardTitle>
        <CardDescription>{t('Overview of all active recognition programs')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Program')}</TableHead>
              <TableHead>{t('Frequency')}</TableHead>
              <TableHead>{t('Total Nominations')}</TableHead>
              <TableHead>{t('Active Nominations')}</TableHead>
              <TableHead>{t('Created')}</TableHead>
              <TableHead className="text-right">{t('Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recognitionPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{t(program.title)}</p>
                    <p className="text-sm text-muted-foreground">{t(program.description)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{getFrequencyLabel(program.frequency)}</Badge>
                </TableCell>
                <TableCell>{program.totalNominations}</TableCell>
                <TableCell>
                  {program.activeNominations > 0 ? (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {program.activeNominations}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell>{formatDatePt(program.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onNominateForProgram(program)}
                    >
                      <Trophy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEditProgram(program)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDeleteProgram(program)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
