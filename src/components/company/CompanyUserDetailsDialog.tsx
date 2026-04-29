import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, MessageCircle, Mail } from "lucide-react";
import { type CompanyUser, type CompanyUserRole } from "@/services/companyUsersApi";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";
import { OneOnOneChatDialog } from "@/components/employees/OneOnOneChatDialog";
import { Employee } from "@/components/employees/types";
import { formatDatePt } from "@/lib/dateFormat";

/** Row shape from CompanyUsersTable (includes precomputed joinDate, lastLogin) */
type CompanyUserRow = CompanyUser & { joinDate?: string; lastLogin?: string };

interface CompanyUserDetailsDialogProps {
  user: CompanyUserRow | null;
  currentUserId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onRoleChange?: (user: CompanyUser, newRole: CompanyUserRole) => Promise<void>;
}

function companyUserToEmployee(user: CompanyUserRow): Employee {
  const name = user.full_name || user.email || "-";
  const joinDate =
    user.joinDate ??
    ((user.created_at ?? user.invited_at)
      ? formatDatePt(user.created_at ?? user.invited_at)
      : "-");
  const lastLogin =
    user.lastLogin ??
    (user.last_login_at
      ? formatDatePt(user.last_login_at)
      : "-");
  return {
    id: 0,
    name,
    joinDate,
    lastLogin,
    activeMissions: 0,
    completeMissions: 0,
    volunteerHours: 0,
    photoUrl: "",
    companyId: user.company_id,
    userId: user.id,
    role: user.role,
    status: user.status,
    skills: [],
    causes: [],
  };
}

export function CompanyUserDetailsDialog({
  user,
  currentUserId,
  isOpen,
  onClose,
  onRoleChange,
}: CompanyUserDetailsDialogProps) {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!user) return null;

  const employee = companyUserToEmployee(user);
  const isCurrentUser = user.source !== "invite" && user.id === currentUserId;
  const canChangeRole =
    !isCurrentUser &&
    user.source !== "invite" &&
    user.status !== "disabled" &&
    typeof onRoleChange === "function";

  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case "active":
        return {
          variant: "outline" as const,
          className:
            "border-green-600/60 bg-green-600 text-white dark:bg-green-700 dark:text-white dark:border-green-600/60",
        };
      case "invited":
        return { variant: "secondary" as const };
      case "pending":
        return { variant: "outline" as const };
      case "disabled":
        return { variant: "destructive" as const };
      default:
        return { variant: "outline" as const };
    }
  };

  const handleContactClick = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={getAvatarUrl(employee.name)} alt={employee.name} />
                <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{employee.name}</DialogTitle>
                <p className="text-muted-foreground">
                  {user.source === "invite"
                    ? t("Invited")
                    : user.role === "admin"
                      ? t("Administrator")
                      : t("Volunteer")}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" {...getStatusBadgeProps(user.status)}>
                {t(user.status)}
              </Badge>
              {user.source !== "invite" && (
                <Badge variant="outline">{t(user.role)}</Badge>
              )}
              {canChangeRole && (
                <div className="flex items-center gap-2 ml-2">
                  <Label className="text-sm text-muted-foreground">{t("Role")}:</Label>
                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      onRoleChange?.(user, value as CompanyUserRole)
                    }
                  >
                    <SelectTrigger className="w-[140px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("Administrator")}</SelectItem>
                      <SelectItem value="volunteer">{t("Volunteer")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.activeMissions}</div>
                <div className="text-sm text-muted-foreground">{t("Active Missions")}</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.completeMissions}</div>
                <div className="text-sm text-muted-foreground">{t("Completed")}</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.volunteerHours}</div>
                <div className="text-sm text-muted-foreground">{t("Total Hours")}</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm text-muted-foreground">{t("Joined")}: </span>
                  <span>{employee.joinDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm text-muted-foreground">{t("Last Login")}: </span>
                  <span>{employee.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("Email")}: </span>
                <span className="text-sm">{user.email}</span>
              </div>
            </div>

            {/* Skills & Causes – volunteers only */}
            {user.role === "volunteer" && (
              <>
                <div>
                  <h4 className="font-medium mb-3">{t("Skills")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(employee.skills?.length ?? 0) > 0 ? (
                      employee.skills!.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">{t("No skills listed")}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">{t("Causes")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(employee.causes?.length ?? 0) > 0 ? (
                      employee.causes!.map((cause) => (
                        <Badge key={cause} variant="outline">{cause}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">{t("No causes listed")}</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Recent activity – placeholder for future API */}
            <div>
              <h4 className="font-medium mb-3">{t("Recent Activity")}</h4>
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">{t("No recent activity")}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleContactClick}
                className="flex-1 bg-coompass-success hover:bg-coompass-success/90"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("Contact")}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(`mailto:${user.email}`, "_blank")}
              >
                <Mail className="h-4 w-4 mr-2" />
                {t("Send Email")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OneOnOneChatDialog
        employee={employee}
        isOpen={isChatOpen}
        onClose={handleChatClose}
      />
    </>
  );
}
