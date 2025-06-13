'use client';

import { FaClock } from 'react-icons/fa';

type BurndownRow = {
  month: string;
  idealHours?: number;
  consumedHours: number;
};

export default function BurndownTable({ data }: { data: BurndownRow[] }) {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-md border w-full lg:w-5/6 border-gray-200 overflow-hidden">
      <div className="bg-cyan-800 text-white text-lg font-semibold px-6 py-4">
        Monthly Burndown Summary
      </div>
      <table className="min-w-full text-left text-cyan-950">
        <thead className="bg-cyan-50 text-cyan-900 ">
          <tr>
            <th className="px-6 py-3 text-sm font-bold">Month</th>
            <th className="px-6 py-3 text-sm font-bold text-right">Ideal Hours</th>
            <th className="px-6 py-3 text-sm font-bold text-right">Hours Consumed</th>
            <th className="px-6 py-3 text-sm font-bold text-right">Hours Left</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ month, idealHours, consumedHours }) => {
            const isTotal = month === "Total";
            const remainingTime =
              idealHours !== undefined ? idealHours - consumedHours : null;

            return (
              <tr
                key={month}
                className={`${isTotal ? 'bg-cyan-50 text-cyan-900 font-semibold' : 'even:bg-gray-50'}`}
              >
                <td className="px-6 py-4">{month}</td>
                <td className="px-6 py-4 text-right">
                  {idealHours !== undefined ? idealHours : ''}
                </td>
                <td className="px-6 py-4 text-right">
                  {consumedHours.toFixed(1)}
                </td>
                <td className={`px-6 py-4 text-right ${remainingTime! < 0 ? 'text-red-600' : ''}`}>
                  {!isTotal && remainingTime !== null ? remainingTime.toFixed(1) : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
