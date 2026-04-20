/** Volunteer hours by month (Jan–Dec). Single source for Hours Tracking chart and Impact Reporting table. */
export function getVolunteerHoursByMonth(): { month: string; hours: number }[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mockHours = [120, 145, 160, 130, 170, 190, 85, 110, 150, 175, 140, 165];
  return monthNames.map((month, i) => ({ month, hours: mockHours[i] ?? 0 }));
}
