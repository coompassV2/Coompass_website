import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { InviteUserDialog } from "./InviteUserDialog";
import { CompanyUsersTable } from "./CompanyUsersTable";

type CompanyAdminTabProps = {
  refreshKey?: number;
};

export function CompanyAdminTab({ refreshKey = 0 }: CompanyAdminTabProps) {
  const { t } = useTranslation();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInviteSuccess = () => {
    setRefreshTrigger((n) => n + 1);
  };

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm">
      <CardHeader className="flex flex-col gap-4 space-y-0 border-b border-border/60 bg-muted/20 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-xl font-semibold">{t("Users")}</CardTitle>
          <CardDescription>{t("Company admin users description")}</CardDescription>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="shrink-0 gap-2">
          <UserPlus className="h-4 w-4" />
          {t("Invite user")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <CompanyUsersTable
          search={search}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
          onRoleFilterChange={setRoleFilter}
          refreshTrigger={refreshTrigger}
          externalRefreshKey={refreshKey}
        />
      </CardContent>

      <InviteUserDialog
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSuccess={handleInviteSuccess}
      />
    </Card>
  );
}
