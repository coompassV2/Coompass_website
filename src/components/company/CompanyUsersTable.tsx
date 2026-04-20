import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Trash2, Eye, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/shared/SearchInput";
import { CompanyLogo } from "@/components/employees/CompanyLogo";
import {
  type CompanyUser,
  type CompanyUserRole,
  fetchCompanyUsers,
  updateCompanyUserRole,
  deleteCompanyUser,
  resendCompanyInvite,
} from "@/services/companyUsersApi";
import { CompanyUserDetailsDialog } from "./CompanyUserDetailsDialog";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { formatDatePt } from "@/lib/dateFormat";

interface CompanyUsersTableProps {
  search: string;
  statusFilter: string;
  roleFilter: string;
  onSearchChange: (v: string) => void;
  onStatusFilterChange: (v: string) => void;
  onRoleFilterChange: (v: string) => void;
  refreshTrigger?: number;
  /** Bumped by parent (e.g. page refresh control) to reload without changing filters. */
  externalRefreshKey?: number;
}

const STATUS_OPTIONS = [
  { value: "", labelKey: "All statuses" },
  { value: "invited", labelKey: "invited" },
  { value: "pending", labelKey: "pending" },
  { value: "active", labelKey: "active" },
  { value: "disabled", labelKey: "disabled" },
] as const;

const ROLE_OPTIONS = [
  { value: "", labelKey: "All roles" },
  { value: "admin", labelKey: "Administrator" },
  { value: "volunteer", labelKey: "Volunteer" },
] as const;

function mapCompanyUserToRow(user: CompanyUser) {
  const name = user.full_name || user.email || "-";
  const joinDate = (user.created_at ?? user.invited_at)
    ? formatDatePt(user.created_at ?? user.invited_at)
    : "-";
  const lastLogin = user.last_login_at
    ? formatDatePt(user.last_login_at)
    : "-";
  return {
    ...user,
    displayName: name,
    joinDate,
    lastLogin,
  };
}

export function CompanyUsersTable({
  search,
  statusFilter,
  roleFilter,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange,
  refreshTrigger = 0,
  externalRefreshKey = 0,
}: CompanyUsersTableProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user: authUser } = useAuth();
  const isLightMode = theme === "light";
  const [isBrisaUser, setIsBrisaUser] = useState(false);
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<CompanyUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewUser, setViewUser] = useState<CompanyUser | null>(null);
  const [resendingInviteId, setResendingInviteId] = useState<string | null>(null);

  useEffect(() => {
    const selectedBrisaCompany = localStorage.getItem("selected-brisa-company");
    setIsBrisaUser(!!selectedBrisaCompany);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchCompanyUsers({
      search: search || undefined,
      status: statusFilter || undefined,
      role: roleFilter || undefined,
    });
    if (error) {
      toast.error(error);
      setUsers([]);
      setTotalCount(0);
    } else {
      setUsers(data?.users ?? []);
      setTotalCount(data?.total ?? data?.users?.length ?? 0);
    }
    setLoading(false);
  }, [search, statusFilter, roleFilter]);

  useEffect(() => {
    load();
  }, [load, refreshTrigger, externalRefreshKey]);

  const handleRoleChange = async (user: CompanyUser, newRole: CompanyUserRole) => {
    if (user.source === "invite") return;
    if (user.role === newRole) return;

    const { error } = await updateCompanyUserRole(user.id, newRole);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(t("Role updated"));
    await load();
    setViewUser((prev) =>
      prev?.id === user.id ? { ...prev, role: newRole } : prev
    );
  };

  const handleDeleteClick = (user: CompanyUser) => {
    if (user.source === "invite") return;
    setDeleteTarget(user);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleteTarget.source === "invite") return;
    setDeleting(true);
    const { error } = await deleteCompanyUser(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(t("User disabled"));
    load();
  };

  const handleResendInvite = async (invite: CompanyUser) => {
    if (invite.source !== "invite" || invite.status !== "invited") return;
    setResendingInviteId(invite.id);
    const { data, error } = await resendCompanyInvite(invite.id);
    setResendingInviteId(null);
    if (error) {
      toast.error(error);
      return;
    }
    const deliveryStatus = data?.email_delivery?.status;
    const deliveryReason = data?.email_delivery?.reason;
    if (deliveryStatus === "sent") {
      toast.success(t("Invitation resent successfully"));
      return;
    }
    if (deliveryStatus === "skipped") {
      toast(t("Invitation updated but email was not sent"), {
        description: deliveryReason ?? t("Email service is not configured."),
      });
      return;
    }
    if (deliveryStatus === "failed") {
      toast.error(t("Failed to resend invitation email"), {
        description: deliveryReason ?? t("Email delivery failed."),
      });
      return;
    }
    toast.success(t("Invitation resent successfully"));
  };

  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case "invited":
        return { variant: "secondary" as const };
      case "pending":
        return { variant: "outline" as const };
      case "active":
        return {
          variant: "outline" as const,
          className:
            "border-green-600/60 bg-green-600 text-white dark:bg-green-700 dark:text-white dark:border-green-600/60",
        };
      case "disabled":
        return { variant: "destructive" as const };
      default:
        return { variant: "outline" as const };
    }
  };

  const rows = users.map(mapCompanyUserToRow);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="flex min-w-0 w-full flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full max-w-[360px] flex-1">
            <SearchInput
              placeholder={t("Search by name or email...")}
              value={search}
              onChange={onSearchChange}
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Select
              value={statusFilter || "all"}
              onValueChange={(v) => onStatusFilterChange(v === "all" ? "" : v)}
            >
              <SelectTrigger className="h-10 w-full sm:w-[200px]">
                <SelectValue placeholder={t("Status")} />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value || "all"} value={o.value || "all"}>
                    {t(o.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={roleFilter || "all"}
              onValueChange={(v) => onRoleFilterChange(v === "all" ? "" : v)}
            >
              <SelectTrigger className="h-10 w-full sm:w-[200px]">
                <SelectValue placeholder={t("Role")} />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((o) => (
                  <SelectItem key={o.value || "all"} value={o.value || "all"}>
                    {t(o.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {!loading && (
          <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted-foreground lg:text-right">
            {t("userCount", { count: totalCount })}
          </p>
        )}
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border/80 shadow-sm",
          isLightMode ? "shadow-md" : ""
        )}
      >
        {loading ? (
          <div className="space-y-2 border border-border/60 bg-muted/10 p-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/80 bg-muted/15 p-10 text-center text-sm text-muted-foreground">
            {t("No users found")}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table
              className={cn(
                "w-full min-w-[980px]",
                isLightMode ? "bg-white" : "bg-black/20 backdrop-blur-sm"
              )}
            >
            <thead>
              <tr
                className={cn(
                  "border-b border-border",
                  isLightMode ? "bg-gray-50" : ""
                )}
              >
                {isBrisaUser && (
                  <th className="text-left px-3 py-2">
                    <span className="text-xs font-medium">{t("Company")}</span>
                  </th>
                )}
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Volunteer")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Role")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Status")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Join date")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Last login")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Active missions")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Complete missions")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Volunteer Hours")}</span>
                </th>
                <th className="text-left px-3 py-2">
                  <span className="text-xs font-medium">{t("Actions")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={
                    row.source === "invite" ? `invite-${row.id}` : row.id
                  }
                  className={cn(
                    "border-b border-border",
                    isLightMode
                      ? "hover:bg-gray-50 text-gray-700"
                      : "hover:bg-foreground/5"
                  )}
                >
                  {isBrisaUser && (
                    <td className="px-3 py-2">
                      {row.company_id ? (
                        <CompanyLogo companyId={row.company_id} />
                      ) : (
                        <div className="h-7 w-7" />
                      )}
                    </td>
                  )}
                  <td className="px-3 py-2">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setViewUser(row)}
                    >
                      <Avatar className="h-7 w-7 border">
                        <AvatarImage
                          src={getAvatarUrl(row.displayName)}
                          alt={row.displayName}
                        />
                        <AvatarFallback>
                          {getInitials(row.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "truncate text-sm",
                          isLightMode ? "text-gray-900" : ""
                        )}
                      >
                        {row.displayName}
                      </span>
                    </div>
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    <Badge variant="outline">{t(row.role)}</Badge>
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    <Badge {...getStatusBadgeProps(row.status)}>
                      {t(row.status)}
                    </Badge>
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    {row.joinDate}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    {row.lastLogin}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    0
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    0
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-sm",
                      isLightMode ? "text-gray-900" : ""
                    )}
                  >
                    0
                  </td>
                  <td className="px-3 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewUser(row)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("View details")}
                        </DropdownMenuItem>
                        {row.source === "invite" && row.status === "invited" && (
                          <DropdownMenuItem
                            onClick={() => handleResendInvite(row)}
                            disabled={resendingInviteId === row.id}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            {resendingInviteId === row.id
                              ? t("Resending invitation...")
                              : t("Resend invitation")}
                          </DropdownMenuItem>
                        )}
                        {row.source !== "invite" && row.status !== "disabled" && (
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(row)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("Disable user")}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        )}
      </div>

      <CompanyUserDetailsDialog
        user={viewUser}
        currentUserId={authUser?.id}
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        onRoleChange={handleRoleChange}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(_) => !deleting && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Disable user")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "This will disable the user. They will no longer be able to log in. The user record will be kept for audit purposes."
              )}
              {deleteTarget && (
                <span className="block mt-2 font-medium">
                  {deleteTarget.full_name || deleteTarget.email}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? t("Disabling...") : t("Disable")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
