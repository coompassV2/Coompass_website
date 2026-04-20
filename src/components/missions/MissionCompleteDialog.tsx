import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  apiGet,
  apiPost,
  getStoredToken,
  uploadMissionAttachment,
} from "@/services/authApi";
import { useToast } from "@/hooks/use-toast";
import type {
  NonprofitMissionParticipantsHoursResponse,
  NonprofitCompleteMissionPayload,
} from "@/types/missions";

interface MissionCompleteDialogProps {
  missionId: string;
  ownerType?: "nonprofit" | "company";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted: () => Promise<void> | void;
}

type HoursByParticipantId = Record<string, string>;

function toFixedHours(value: number): string {
  return String(Math.round(value * 100) / 100);
}

export function MissionCompleteDialog({
  missionId,
  ownerType = "nonprofit",
  open,
  onOpenChange,
  onCompleted,
}: MissionCompleteDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<
    NonprofitMissionParticipantsHoursResponse["participants"]
  >([]);
  const [hoursByParticipantId, setHoursByParticipantId] = useState<HoursByParticipantId>({});
  const [finalBeneficiariesCount, setFinalBeneficiariesCount] = useState("0");
  const [finalDocuments, setFinalDocuments] = useState<File[]>([]);
  const [finalPhotos, setFinalPhotos] = useState<File[]>([]);

  useEffect(() => {
    let cancelled = false;
    const loadParticipants = async () => {
      if (!open) return;
      setLoading(true);
      setLoadError(null);
      const token = getStoredToken();
      const { data, error } = await apiGet<NonprofitMissionParticipantsHoursResponse>(
        `/api/missions/${missionId}/participants-hours`,
        token
      );
      if (cancelled) return;
      if (error) {
        setParticipants([]);
        setHoursByParticipantId({});
        setLoadError(error);
        setLoading(false);
        return;
      }

      const rows = data?.participants ?? [];
      setParticipants(rows);
      setFinalBeneficiariesCount(String(data?.mission?.beneficiaries_count ?? 0));
      setHoursByParticipantId(
        rows.reduce<HoursByParticipantId>((acc, row) => {
          acc[row.participantId] = toFixedHours(row.hoursInput);
          return acc;
        }, {})
      );
      setLoading(false);
    };

    void loadParticipants();
    return () => {
      cancelled = true;
    };
  }, [missionId, open, ownerType]);

  const totalHours = useMemo(
    () =>
      participants.reduce((sum, participant) => {
        const value = Number.parseFloat(hoursByParticipantId[participant.participantId] ?? "0");
        return sum + (Number.isFinite(value) && value >= 0 ? value : 0);
      }, 0),
    [hoursByParticipantId, participants]
  );

  const hasInvalidHours = participants.some((participant) => {
    const raw = hoursByParticipantId[participant.participantId] ?? "";
    const value = Number.parseFloat(raw);
    return !Number.isFinite(value) || value < 0;
  });

  const parsedFinalBeneficiaries = Number.parseInt(finalBeneficiariesCount, 10);
  const hasInvalidFinalBeneficiaries =
    !Number.isFinite(parsedFinalBeneficiaries) || parsedFinalBeneficiaries < 0;

  const handleAddFiles = (nextFiles: FileList | null, category: "photos" | "final_documents") => {
    if (!nextFiles || nextFiles.length === 0) return;
    const incoming = Array.from(nextFiles);
    if (category === "photos") {
      setFinalPhotos((prev) => {
        const merged = [...prev, ...incoming].slice(0, 5);
        if (prev.length + incoming.length > 5) {
          toast({
            title: t("Maximum reached"),
            description: t("You can upload up to 5 photos."),
            variant: "destructive",
          });
        }
        return merged;
      });
      return;
    }
    setFinalDocuments((prev) => {
      const merged = [...prev, ...incoming].slice(0, 5);
      if (prev.length + incoming.length > 5) {
        toast({
          title: t("Maximum reached"),
          description: t("You can upload up to 5 final documents."),
          variant: "destructive",
        });
      }
      return merged;
    });
  };

  const removePendingFile = (category: "photos" | "final_documents", idx: number) => {
    if (category === "photos") {
      setFinalPhotos((prev) => prev.filter((_, i) => i !== idx));
      return;
    }
    setFinalDocuments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (
      submitting ||
      loading ||
      hasInvalidHours ||
      hasInvalidFinalBeneficiaries ||
      participants.length === 0
    ) {
      return;
    }
    setSubmitting(true);
    const token = getStoredToken();
    if (!token) {
      setSubmitting(false);
      toast({ title: t("Error"), description: t("Session expired. Please sign in again."), variant: "destructive" });
      return;
    }

    for (const file of finalPhotos) {
      const { error: uploadError } = await uploadMissionAttachment(missionId, "photos", file, token);
      if (uploadError) {
        setSubmitting(false);
        toast({ title: t("Error"), description: uploadError, variant: "destructive" });
        return;
      }
    }
    for (const file of finalDocuments) {
      const { error: uploadError } = await uploadMissionAttachment(
        missionId,
        "final_documents",
        file,
        token
      );
      if (uploadError) {
        setSubmitting(false);
        toast({ title: t("Error"), description: uploadError, variant: "destructive" });
        return;
      }
    }

    const payload: NonprofitCompleteMissionPayload = {
      participants: participants.map((participant) => ({
        participantId: participant.participantId,
        hours: Math.round((Number.parseFloat(hoursByParticipantId[participant.participantId] ?? "0") || 0) * 100) / 100,
      })),
      finalBeneficiariesCount: parsedFinalBeneficiaries,
    };
    const { error } = await apiPost(`/api/missions/${missionId}/complete`, payload, token);
    setSubmitting(false);
    if (error) {
      toast({ title: t("Error"), description: error, variant: "destructive" });
      return;
    }
    toast({ title: t("Mission completed") });
    await onCompleted();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("Complete Mission")}</DialogTitle>
          <DialogDescription>
            {t("Review and edit final hours for each approved participant before completing this mission.")}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground">{t("Loading...")}</p>
        ) : loadError ? (
          <p className="text-sm text-destructive">{loadError}</p>
        ) : participants.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("No approved participants found for this mission.")}
          </p>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Volunteer")}</TableHead>
                    <TableHead>{t("Email")}</TableHead>
                    <TableHead className="w-[180px]">{t("Final hours")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => {
                    const value = hoursByParticipantId[participant.participantId] ?? "";
                    const parsed = Number.parseFloat(value);
                    const invalid = value.trim().length > 0 && (!Number.isFinite(parsed) || parsed < 0);
                    return (
                      <TableRow key={participant.participantId}>
                        <TableCell className="font-medium">
                          {participant.volunteerName ?? t("Unknown volunteer")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {participant.volunteerEmail ?? "-"}
                        </TableCell>
                        <TableCell>
                          <Input
                            value={value}
                            type="number"
                            min={0}
                            step="0.25"
                            onChange={(event) =>
                              setHoursByParticipantId((prev) => ({
                                ...prev,
                                [participant.participantId]: event.target.value,
                              }))
                            }
                            className={invalid ? "border-destructive focus-visible:ring-destructive" : ""}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Total final hours")}:{" "}
              <span className="font-medium text-foreground">
                {Math.round(totalHours * 100) / 100}
              </span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Final beneficiaries impacted")}</label>
              <Input
                type="number"
                min={0}
                value={finalBeneficiariesCount}
                onChange={(event) => setFinalBeneficiariesCount(event.target.value)}
                className={
                  hasInvalidFinalBeneficiaries
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Completion photos (max 5)")}</label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => {
                  handleAddFiles(event.target.files, "photos");
                  event.currentTarget.value = "";
                }}
              />
              {finalPhotos.length > 0 ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {finalPhotos.map((file, index) => (
                    <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2">
                      <span className="truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePendingFile("photos", index)}
                      >
                        {t("Remove")}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Final documents (max 5)")}</label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip"
                multiple
                onChange={(event) => {
                  handleAddFiles(event.target.files, "final_documents");
                  event.currentTarget.value = "";
                }}
              />
              {finalDocuments.length > 0 ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {finalDocuments.map((file, index) => (
                    <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2">
                      <span className="truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePendingFile("final_documents", index)}
                      >
                        {t("Remove")}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {hasInvalidHours ? (
              <p className="text-sm text-destructive">
                {t("Final hours must be a number greater than or equal to zero.")}
              </p>
            ) : null}
            {hasInvalidFinalBeneficiaries ? (
              <p className="text-sm text-destructive">
                {t("Final beneficiaries must be a number greater than or equal to zero.")}
              </p>
            ) : null}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            {t("Cancel")}
          </Button>
          <Button
            className="bg-coompass-success hover:bg-coompass-success/90 text-white"
            disabled={
              loading ||
              submitting ||
              participants.length === 0 ||
              hasInvalidHours ||
              hasInvalidFinalBeneficiaries
            }
            onClick={handleSubmit}
          >
            {submitting ? t("Loading...") : t("Confirm and Complete Mission")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
