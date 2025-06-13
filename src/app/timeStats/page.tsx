'use client'
import Navigation from "../components/Global/NavBar"
import BurndownChart from "../components/TimeStats/BurndownChart";
import BurndownTable from "../components/TimeStats/BurndownTable";
import DefTimeStats from "../components/TimeStats/TimeStats"
import { useEntries } from "../hooks/useEntries";

 

export default function TimeStats() {
    const {data: entries = [] } = useEntries();

    return (
        <div>
            <Navigation title="My Time Stats "/>
            <div className="flex flex-col items-center justify-center">
                <DefTimeStats/>
                <BurndownTable data={aggregateHoursByMonth(entries)}/>
                <BurndownChart data={aggregateHoursByMonth(entries)}/>
            </div>
        </div>
    )
}

function aggregateHoursByMonth(entries: Entry[]): BurndownData[] {
  const monthlyData: Record<string, { consumedHours: number }> = {};

  const IDEAL_HOURS_START = 1800; 
  const IDEAL_HOURS_DECREMENT = 150; 

  entries.forEach(entry => {
    const date = new Date(entry.date);
    const monthKey = date.toISOString().slice(0,7); // "YYYY-MM"

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { consumedHours: 0 };
    }
    monthlyData[monthKey].consumedHours += Number(entry.hours);
  });

  const sortedMonths = Object.keys(monthlyData).sort();

  const result = sortedMonths.map((month, index) => {
    const consumedHours = monthlyData[month].consumedHours;
    const idealHours = Math.max(0, IDEAL_HOURS_START - IDEAL_HOURS_DECREMENT * index);

    const [year, monthStr] = month.split('-');
    const monthIndex = Number(monthStr) - 1;
    const date = new Date(Number(year), monthIndex, 1);
    const displayMonth = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    return {
      month: displayMonth,
      idealHours,
      consumedHours,
    };
  });

  const totalConsumedHours = result.reduce((sum, row) => sum + row.consumedHours, 0);

  result.push({
    month: "Total",
    consumedHours: totalConsumedHours,
  });

  return result;
}
