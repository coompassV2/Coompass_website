
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/avatarUtils";
import { CompanyLogo } from "./CompanyLogo";

interface PendingEmployee {
  name: string;
  joinDate: string;
  department: string;
  role: string;
  photoUrl?: string;
  companyId?: string;
}

interface PendingEmployeesTableProps {
  employees: PendingEmployee[];
  onAcceptEmployee: (name: string) => void;
  onRejectEmployee: (name: string) => void;
}

export function PendingEmployeesTable({ 
  employees, 
  onAcceptEmployee, 
  onRejectEmployee 
}: PendingEmployeesTableProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [isBrisaUser, setIsBrisaUser] = useState(false);

  useEffect(() => {
    // Check if user came from login-brisa
    const selectedBrisaCompany = localStorage.getItem("selected-brisa-company");
    setIsBrisaUser(!!selectedBrisaCompany);
  }, []);

  const handleRejectClick = (employeeName: string) => {
    setSelectedEmployee(employeeName);
    setShowRejectDialog(true);
  };

  const handleConfirmReject = () => {
    onRejectEmployee(selectedEmployee);
    setShowRejectDialog(false);
    setSelectedEmployee("");
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t("Waiting for Approval")}</h2>
        <div className={cn(
          "rounded-lg overflow-hidden border border-border shadow-sm",
          isLightMode ? "shadow-md" : ""
        )}>
          <table className={cn(
            "w-full",
            isLightMode 
              ? "bg-white" 
              : "bg-black/20 backdrop-blur-sm"
          )}>
            <thead>
              <tr className={cn(
                "border-b border-border",
                isLightMode ? "bg-gray-50" : ""
              )}>
                {isBrisaUser && (
                  <th className="text-left px-4 py-3">
                    <span className="text-xs font-medium flex items-center">
                      {t("Company")}
                    </span>
                  </th>
                )}
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-medium flex items-center">
                    {t("Employee")}
                  </span>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-medium flex items-center">
                    {t("Join date")}
                  </span>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-medium flex items-center">
                    {t("Department")}
                  </span>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-medium flex items-center">
                    {t("Role")}
                  </span>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-medium flex items-center">
                    {t("Actions")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr 
                  key={index} 
                  className={cn(
                    "border-b border-border",
                    isLightMode 
                      ? "hover:bg-gray-50 text-gray-700" 
                      : "hover:bg-foreground/5"
                  )}
                >
                  {isBrisaUser && (
                    <td className="px-4 py-3">
                      {employee.companyId ? (
                        <CompanyLogo companyId={employee.companyId} />
                      ) : (
                        <div className="h-8 w-8" />
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={employee.photoUrl} alt={employee.name} />
                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "truncate",
                        isLightMode ? "text-gray-900" : ""
                      )}>
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className={cn(
                    "px-4 py-3",
                    isLightMode ? "text-gray-900" : ""
                  )}>
                    {employee.joinDate}
                  </td>
                  <td className={cn(
                    "px-4 py-3",
                    isLightMode ? "text-gray-900" : ""
                  )}>
                    {employee.department}
                  </td>
                  <td className={cn(
                    "px-4 py-3",
                    isLightMode ? "text-gray-900" : ""
                  )}>
                    {employee.role}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "bg-transparent hover:bg-coompass-success/20 text-coompass-success",
                          isLightMode ? "border-gray-200" : "border-gray-700"
                        )}
                        onClick={() => onAcceptEmployee(employee.name)}
                      >
                        {t("Accept")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "bg-transparent hover:bg-red-500/10 text-red-500",
                          isLightMode ? "border-gray-200" : "border-gray-700"
                        )}
                        onClick={() => handleRejectClick(employee.name)}
                      >
                        {t("Reject")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Confirm Rejection")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to reject")} {selectedEmployee}? {t("This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmReject}
              className="bg-red-500 hover:bg-red-600"
            >
              {t("Reject")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
