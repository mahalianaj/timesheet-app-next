'use client';

import { LineChart } from '@mui/x-charts';

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

const comparison = ideal.map((idealVal, i) => idealVal - (consumed[i] ?? 0));

  return (
    <div className="mt-8 w-full lg:w-5/6 mx-auto g-white text-cove-50 rounded-3xl shadow-md border bg-custom-100 border-custom-100 overflow-hidden">
    <div className="bg-custom-100 text-cove-50 text-lg font-semibold mb-5 px-6 py-4">Burndown Chart</div>
    <LineChart 
        xAxis={[{ data: months, scaleType: 'band', label: 'Month' }] }
        series={[
        { data: ideal, label: 'Ideal Hours', color: '#34c917',  },
        { data: comparison, label: 'Consumed Hours', color: '#005fe6' },
        ]}
        sx={{
          // Override tick label colors
          '& .MuiChartsAxis-tickLabel': {
            fill: '#f4f7fa !important', // force override inline fill
          },
          // Axis label (Y-axis title like "Hours")
          '& .MuiChartsAxis-label': {
            fill: '#f4f7fa !important',
            fontWeight: 500,
          },

          // Axis line
          '& .MuiChartsAxis-line': {
            stroke: '#94a3b8',
            strokeWidth: 2,
          },

          // Grid lines
          '& .MuiChartsGrid-line': {
            stroke: '#334155',
            strokeDasharray: '4',
          },

          // Tooltip
          '& .MuiChartsTooltip-tooltip': {
            backgroundColor: '#1e293b',
            color: '#f4f7fa',
          },

          '& .MuiChartsLegend-label': {
            color: '#f4f7fa !important',
          },

        }}

        height={400}
        yAxis={[{ label: 'Hours' }]}
        margin={{ top: 25, bottom: 30, left: 50, right: 50 }}
        grid={{ vertical: true, horizontal: true }}
    />
    </div>
  );
}
