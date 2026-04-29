import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";

export function CompanyLayout() {
  return (
    <>
      <AppSidebar />
      <Outlet />
    </>
  );
}
