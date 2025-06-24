export function totalHoursToWork(startDate: string, endDate: string, offDays: string[] = []) {
  const averageWorkDay = 8;
  const start = new Date(startDate);
  const end = new Date(endDate);
  let workingDays = 0;
  const offDaysSet = new Set(offDays);

  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    if (!offDaysSet.has(dateStr)) workingDays++;
    current.setDate(current.getDate() + 1);
  }

  return workingDays * averageWorkDay;
}