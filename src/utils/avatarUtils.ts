
import { employeesData } from "@/data/employees";

// Function to get employee photo by name
export const getEmployeePhoto = (employeeName: string): string | null => {
  const employee = employeesData.find(emp => emp.name === employeeName);
  return employee?.photoUrl || null;
};

// Function to get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// Function to get avatar URL with fallback
export const getAvatarUrl = (employeeName: string): string => {
  const photoUrl = getEmployeePhoto(employeeName);
  if (photoUrl) {
    return photoUrl;
  }
  
  // Fallback to dicebear for unknown employees
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${employeeName}`;
};
