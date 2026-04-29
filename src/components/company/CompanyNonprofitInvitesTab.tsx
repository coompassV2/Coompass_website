import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Building2, Check, Copy, Link2, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchInput } from "@/components/shared/SearchInput";
import { useTheme } from "@/hooks/useTheme";
import { formatDatePt } from "@/lib/dateFormat";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  type CompanyNonprofitInvite,
  deleteCompanyNonprofitInvite,
  fetchCompanyNonprofitInvites,
  resendCompanyNonprofitInvite,
} from "@/services/companyOrganizationsApi";
import { InviteOrganizationDialog } from "./InviteOrganizationDialog";

const STATUS_OPTIONS = [
  { value: "all", labelKey: "All statuses" },
  { value: "invited", labelKey: "invited" },
  { value: "accepted", labelKey: "accepted" },
  { value: "expired", labelKey: "expired" },
] as const;

type DisplayStatus = "invited" | "accepted" | "expired";

function getDisplayStatus(invite: CompanyNonprofitInvite): DisplayStatus {
  if (invite.status === "accepted") return "accepted";
  if (invite.status === "expired") return "expired";
  if (invite.is_pending_expired) return "expired";
  return "invited";
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "-";
  return formatDatePt(value);
}

function getDeleteInviteErrorTranslationKey(error: string): string {
  if (error === "Invite not found.") return "Invite not found.";
  if (error === "Accepted invites cannot be deleted.") return "Accepted invites cannot be deleted.";
  return "Could not delete invite";
}

function getStatusBadgeClass(displayStatus: DisplayStatus): string {
  switch (displayStatus) {
    case "invited":
      return "border-amber-500/50 bg-amber-500/10 text-foreground dark:border-amber-400/40";
    case "accepted":
      return "border-emerald-600/45 bg-emerald-500/10 text-foreground dark:border-emerald-500/40";
    case "expired":
      return "";
    default:
      return "";
  }
}

function TruncatedWithTooltip({ text, className }: { text: string; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn("block truncate", className)}>{text}</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-sm break-all">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

function InvitesLoadingSkeleton({ isLightMode }: { isLightMode: boolean }) {
  return (
    <div
      className={cn(
        "space-y-3 rounded-lg border p-4",
        isLightMode ? "border-border/80 bg-white shadow-sm" : "border-border/80 bg-muted/10"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-full max-w-[360px]" />
        <Skeleton className="h-10 w-full sm:w-[220px]" />
      </div>
      <div className="space-y-2 pt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

type CompanyNonprofitInvitesTabProps = {
  /** Increment from parent to reload the list without changing route. */
  refreshSignal?: number;
};

export function CompanyNonprofitInvitesTab({ refreshSignal = 0 }: CompanyNonprofitInvitesTabProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const isMobile = useIsMobile();
  const [invites, setInvites] = useState<CompanyNonprofitInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DisplayStatus | "">("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [resendingInviteId, setResendingInviteId] = useState<string | null>(null);
  const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CompanyNonprofitInvite | null>(null);
  const [deletingInvite, setDeletingInvite] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchCompanyNonprofitInvites({ page: 1, limit: 100 });
    if (error) {
      toast.error(error);
      setInvites([]);
      setLoading(false);
      return;
    }
    setInvites(data?.invites ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshSignal]);

  const filteredInvites = useMemo(() => {
    const query = search.trim().toLowerCase();
    return invites.filter((invite) => {
      const displayStatus = getDisplayStatus(invite);
      if (statusFilter && displayStatus !== statusFilter) return false;
      if (!query) return true;
      return (
        invite.organization_name.toLowerCase().includes(query) ||
        invite.email.toLowerCase().includes(query)
      );
    });
  }, [invites, search, statusFilter]);

  const handleResendInvite = async (invite: CompanyNonprofitInvite) => {
    if (invite.status !== "invited" && invite.status !== "expired") return;
    setResendingInviteId(invite.id);
    const { data, error } = await resendCompanyNonprofitInvite({ inviteId: invite.id });
    setResendingInviteId(null);
    if (error) {
      toast.error(error);
      return;
    }

    const deliveryStatus = data?.email_delivery?.status;
    const deliveryReason = data?.email_delivery?.reason;
    if (deliveryStatus === "sent") {
      toast.success(t("Invitation resent successfully"));
    } else if (deliveryStatus === "skipped") {
      toast(t("Invitation updated but email was not sent"), {
        description: deliveryReason ?? t("Email service is not configured."),
      });
    } else if (deliveryStatus === "failed") {
      toast.error(t("Failed to resend invitation email"), {
        description: deliveryReason ?? t("Email delivery failed."),
      });
    } else {
      toast.success(t("Invitation resent successfully"));
    }

    await load();
  };

  const handleCopyLink = async (invite: CompanyNonprofitInvite) => {
    if (!invite.invite_link) return;
    try {
      await navigator.clipboard.writeText(invite.invite_link);
      setCopiedInviteId(invite.id);
      toast.success(t("Link copied to clipboard"));
      setTimeout(() => setCopiedInviteId((current) => (current === invite.id ? null : current)), 2000);
    } catch {
      toast.error(t("Failed to copy link"));
    }
  };

  const handleDeleteInviteClick = (invite: CompanyNonprofitInvite) => {
    if (invite.status === "accepted") return;
    setDeleteTarget(invite);
  };

  const handleDeleteInviteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingInvite(true);
    const { data, error } = await deleteCompanyNonprofitInvite({ inviteId: deleteTarget.id });
    setDeletingInvite(false);
    setDeleteTarget(null);

    if (error) {
      toast.error(t(getDeleteInviteErrorTranslationKey(error)));
      return;
    }

    if (data?.deleted_nonprofit_placeholder) {
      toast.success(t("Invite and pending nonprofit data removed"));
    } else {
      toast.success(t("Invite removed"));
    }
    await load();
  };

  const renderRowActions = (invite: CompanyNonprofitInvite) => {
    const canResend = invite.status === "invited" || invite.status === "expired";
    const hasLink = Boolean(invite.invite_link);
    const canDelete = invite.status !== "accepted";
    const isResending = resendingInviteId === invite.id;
    const hasActions = hasLink || canResend || canDelete;

    if (!hasActions) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={t("Actions")}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {hasLink && (
            <DropdownMenuItem
              onClick={() => handleCopyLink(invite)}
              disabled={copiedInviteId === invite.id}
            >
              {copiedInviteId === invite.id ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {t("Copy link")}
            </DropdownMenuItem>
          )}
          {canResend && (
            <DropdownMenuItem onClick={() => handleResendInvite(invite)} disabled={isResending}>
              <RotateCcw className={cn("mr-2 h-4 w-4", isResending && "animate-spin")} />
              {isResending ? t("Resending...") : t("Resend invite")}
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem
              onClick={() => handleDeleteInviteClick(invite)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t("Delete invite")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderUrlCell = (invite: CompanyNonprofitInvite) => {
    if (!invite.invite_link) {
      return <span className="text-sm text-muted-foreground">—</span>;
    }
    return (
      <div className="flex max-w-[220px] items-center gap-2">
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate font-mono text-xs text-muted-foreground">{invite.invite_link}</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-md break-all font-mono text-xs">
            {invite.invite_link}
          </TooltipContent>
        </Tooltip>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => handleCopyLink(invite)}
          title={t("Copy link")}
        >
          {copiedInviteId === invite.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  };

  const showTable = !isMobile;

  return (
    <TooltipProvider delayDuration={300}>
      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="flex flex-col gap-4 space-y-0 border-b border-border/60 bg-muted/20 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold">{t("Nonprofit invites heading")}</CardTitle>
            <CardDescription>{t("Nonprofit invites description")}</CardDescription>
          </div>
          <Button onClick={() => setInviteDialogOpen(true)} className="shrink-0 gap-2">
            <Building2 className="h-4 w-4" />
            {t("Invite nonprofit")}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="flex min-w-0 w-full flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full max-w-[360px] flex-1">
                <SearchInput
                  placeholder={t("Search by organization or email...")}
                  value={search}
                  onChange={setSearch}
                />
              </div>
              <Select
                value={statusFilter || "all"}
                onValueChange={(v) => setStatusFilter(v === "all" ? "" : (v as DisplayStatus))}
              >
                <SelectTrigger className="h-10 w-full sm:w-[220px]">
                  <SelectValue placeholder={t("Status")} />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!loading && (
              <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted-foreground lg:text-right">
                {t("inviteCount", { count: filteredInvites.length })}
              </p>
            )}
          </div>

          {loading ? (
            <InvitesLoadingSkeleton isLightMode={isLightMode} />
          ) : invites.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/15 px-6 py-14 text-center">
              <Building2 className="mb-4 h-12 w-12 text-muted-foreground/40" aria-hidden />
              <p className="text-sm font-medium text-foreground">{t("No nonprofit invites found")}</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">{t("Nonprofit invites empty hint")}</p>
              <Button className="mt-6 gap-2" onClick={() => setInviteDialogOpen(true)}>
                <Building2 className="h-4 w-4" />
                {t("Invite nonprofit")}
              </Button>
            </div>
          ) : filteredInvites.length === 0 ? (
            <div className="rounded-lg border border-border/60 bg-muted/10 px-6 py-10 text-center">
              <p className="text-sm font-medium text-foreground">{t("No matching invites")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("No matching invites hint")}</p>
            </div>
          ) : (
            <>
              {showTable && (
                <div
                  className={cn(
                    "overflow-x-auto rounded-lg border border-border/60",
                    isLightMode && "bg-white shadow-sm"
                  )}
                >
                  <Table
                    className={cn(
                      isLightMode ? "bg-white" : "bg-black/20 backdrop-blur-sm"
                    )}
                  >
                    <TableHeader>
                      <TableRow
                        className={cn(
                          "border-b hover:bg-transparent",
                          isLightMode && "bg-gray-50"
                        )}
                      >
                        <TableHead className="min-w-[140px] whitespace-nowrap">{t("Organization")}</TableHead>
                        <TableHead className="min-w-[160px] whitespace-nowrap">{t("Email")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("Status")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("Created")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("Invite expires at")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("Accepted at")}</TableHead>
                        <TableHead className="min-w-[200px]">{t("Acceptance URL")}</TableHead>
                        <TableHead className="w-[72px] text-right">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvites.map((invite) => {
                        const displayStatus = getDisplayStatus(invite);
                        const badgeExtra = getStatusBadgeClass(displayStatus);
                        return (
                          <TableRow
                            key={invite.id}
                            className={cn(
                              isLightMode
                                ? "text-gray-700 hover:bg-gray-50"
                                : "hover:bg-foreground/5"
                            )}
                          >
                            <TableCell className="max-w-[200px] font-medium">
                              <TruncatedWithTooltip text={invite.organization_name} />
                            </TableCell>
                            <TableCell className="max-w-[220px]">
                              <TruncatedWithTooltip
                                text={invite.email}
                                className="text-muted-foreground"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={displayStatus === "expired" ? "destructive" : "outline"}
                                className={cn(displayStatus !== "expired" && badgeExtra)}
                              >
                                {t(displayStatus)}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                              {formatDate(invite.created_at)}
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                              {formatDate(invite.expires_at)}
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                              {formatDate(invite.accepted_at)}
                            </TableCell>
                            <TableCell>{renderUrlCell(invite)}</TableCell>
                            <TableCell className="text-right">{renderRowActions(invite)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}

              {!showTable && (
                <div className="space-y-3">
                  {filteredInvites.map((invite) => {
                    const displayStatus = getDisplayStatus(invite);
                    const badgeExtra = getStatusBadgeClass(displayStatus);
                    const rowActions = renderRowActions(invite);
                    return (
                      <div
                        key={invite.id}
                        className={cn(
                          "rounded-lg border border-border/70 p-4 shadow-sm",
                          isLightMode ? "bg-white" : "bg-card/50"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1 space-y-1">
                            <p className="truncate font-medium">{invite.organization_name}</p>
                            <p className="truncate text-sm text-muted-foreground">{invite.email}</p>
                          </div>
                          <Badge
                            variant={displayStatus === "expired" ? "destructive" : "outline"}
                            className={cn("shrink-0", displayStatus !== "expired" && badgeExtra)}
                          >
                            {t(displayStatus)}
                          </Badge>
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                          <dt className="text-muted-foreground">{t("Created")}</dt>
                          <dd className="text-right">{formatDate(invite.created_at)}</dd>
                          <dt className="text-muted-foreground">{t("Invite expires at")}</dt>
                          <dd className="text-right">{formatDate(invite.expires_at)}</dd>
                          <dt className="text-muted-foreground">{t("Accepted at")}</dt>
                          <dd className="text-right">{formatDate(invite.accepted_at)}</dd>
                        </dl>
                        {invite.invite_link && (
                          <div className="mt-3 flex items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2">
                            <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
                              {invite.invite_link}
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0"
                              onClick={() => handleCopyLink(invite)}
                            >
                              {copiedInviteId === invite.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        )}
                        {rowActions && (
                          <div className="mt-3 flex justify-end border-t border-border/50 pt-3">
                            {rowActions}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <InviteOrganizationDialog
        isOpen={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
        onSuccess={() => {
          void load();
        }}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deletingInvite) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Delete invite")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "This removes the invite and deletes any pending nonprofit placeholder data created for it."
              )}
              {deleteTarget && (
                <span className="mt-2 block font-medium">
                  {deleteTarget.organization_name} ({deleteTarget.email})
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingInvite}>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletingInvite}
              onClick={handleDeleteInviteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingInvite ? t("Deleting...") : t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
