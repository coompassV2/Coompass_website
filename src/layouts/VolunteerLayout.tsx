import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";

export function VolunteerLayout() {
  return (
    <>
      <AppSidebar />
      <Outlet />
    </>
  );
}
