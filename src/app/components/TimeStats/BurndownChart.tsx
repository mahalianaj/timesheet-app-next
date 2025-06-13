'use client';

import { LineChart } from '@mui/x-charts';
import { Card, CardContent, Typography } from '@mui/material';

type BurndownRow = {
  month: string;
  idealHours?: number;
  consumedHours: number;
};

export default function BurndownChart({ data }: { data: BurndownRow[] }) {
  // Filter out the "Total" row
  const filteredData = data.filter(row => row.month !== 'Total');

  const months = filteredData.map(row => row.month);
  const ideal = filteredData.map(row => row.idealHours ?? 0);
  const consumed = filteredData.map(row => row.consumedHours);

  return (
    <div className="mt-8 w-full lg:w-5/6 mx-auto g-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
    <div className="bg-cyan-800 text-white text-lg font-semibold mb-5 px-6 py-4">Burndown Chart</div>
    <LineChart 
        xAxis={[{ data: months, scaleType: 'band', label: 'Month' }]}
        series={[
        { data: ideal, label: 'Ideal Hours', color: '#0e7490' },
        { data: consumed, label: 'Consumed Hours', color: '#dc2626' },
        ]}
        height={400}
        yAxis={[{ label: 'Hours' }]}
        margin={{ top: 25, bottom: 30, left: 50, right: 50 }}
        grid={{ vertical: true, horizontal: true }}
    />
    </div>
  );
}
