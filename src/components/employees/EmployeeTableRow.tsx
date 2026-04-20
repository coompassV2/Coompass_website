
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Employee } from "./types";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";
import { CompanyLogo } from "./CompanyLogo";

interface EmployeeTableRowProps {
  employee: Employee;
  isLightMode: boolean;
  onRemove: (name: string) => void;
  onView: () => void;
  hideActions?: boolean;
}

export function EmployeeTableRow({ 
  employee, 
  isLightMode, 
  onRemove,
  onView,
  hideActions
}: EmployeeTableRowProps) {
  const { t } = useTranslation();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isBrisaUser, setIsBrisaUser] = useState(false);

  useEffect(() => {
    // Check if user came from login-brisa
    const selectedBrisaCompany = localStorage.getItem("selected-brisa-company");
    setIsBrisaUser(!!selectedBrisaCompany);
  }, []);

  const handleRemoveClick = () => {
    setShowRemoveDialog(true);
  };

  const handleConfirmRemove = () => {
    onRemove(employee.name);
    setShowRemoveDialog(false);
  };

  return (
    <>
      <tr 
        className={cn(
          "border-b border-border",
          isLightMode 
            ? "hover:bg-gray-50 text-gray-700" 
            : "hover:bg-foreground/5"
        )}
      >
        {isBrisaUser && (
          <td className="px-3 py-2">
            {employee.companyId ? (
              <CompanyLogo companyId={employee.companyId} />
            ) : (
              <div className="h-7 w-7" />
            )}
          </td>
        )}
        <td className="px-3 py-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onView}>
            <Avatar className="h-7 w-7 border">
              <AvatarImage src={getAvatarUrl(employee.name)} alt={employee.name} />
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <span className={cn(
              "truncate text-sm",
              isLightMode ? "text-gray-900" : ""
            )}>
              {employee.name}
            </span>
          </div>
        </td>
        <td className={cn(
          "px-3 py-2 text-sm",
          isLightMode ? "text-gray-900" : ""
        )}>
          {employee.joinDate}
        </td>
        <td className={cn(
          "px-3 py-2 text-sm",
          isLightMode ? "text-gray-900" : ""
        )}>
          {employee.lastLogin}
        </td>
        <td className={cn(
          "px-3 py-2 text-sm",
          isLightMode ? "text-gray-900" : ""
        )}>
          {employee.activeMissions}
        </td>
        <td className={cn(
          "px-3 py-2 text-sm",
          isLightMode ? "text-gray-900" : ""
        )}>
          {employee.completeMissions}
        </td>
        <td className={cn(
          "px-3 py-2 text-sm",
          isLightMode ? "text-gray-900" : ""
        )}>
          {employee.volunteerHours}
        </td>
        {!hideActions && (
          <td className="px-3 py-2">
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs bg-transparent hover:bg-coompass-success/20 text-coompass-success",
                  isLightMode ? "border-gray-200" : "border-gray-700"
                )}
                onClick={onView}
              >
                {t("View")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs bg-transparent hover:bg-red-500/10 text-red-500",
                  isLightMode ? "border-gray-200" : "border-gray-700"
                )}
                onClick={handleRemoveClick}
              >
                {t("Remove")}
              </Button>
            </div>
          </td>
        )}
      </tr>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Confirm Removal")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to remove")} {employee.name}? {t("This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmRemove}
              className="bg-red-500 hover:bg-red-600"
            >
              {t("Remove")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
