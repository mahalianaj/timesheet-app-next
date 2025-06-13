'use client'
import { useState, useEffect } from "react";
import { FaClock, FaHourglassHalf, FaRegCalendarCheck } from "react-icons/fa";
import { useUsers } from "@/app/hooks/useUsers";
import { useOffDays } from "@/app/hooks/useOffDays";
import { useEntries } from "@/app/hooks/useEntries";


export default function DefTimeStats() {

  const [hours, setHours] = useState<string>('0');
  const [hoursConsumed, setHoursConsumed] = useState<string>('0');
  const [hoursLeft, setHoursLeft] = useState<string>('0');
  const {data: users = []} = useUsers();
  const {data: offDays = []} = useOffDays();
  const {data: entries = []} = useEntries();

  const user = users?.[0];

  useEffect(() => {
    if (!user || offDays.length === 0 || entries.length === 0) {
      return;
    };

    const totalHours = totalHoursToWork(user.start_period, user.end_period);
    const totalHoursConsumed = entries.reduce((sum, row) => sum + Number(row.hours), 0);
    const totalHoursLeft = totalHours - totalHoursConsumed;

      if (
    hours === totalHours.toString() &&
    hoursConsumed === totalHoursConsumed.toString() &&
    hoursLeft === totalHoursLeft.toString()
  ) {
    return;
  }

    setHours(totalHours.toString());
    setHoursConsumed(totalHoursConsumed.toString());
    setHoursLeft(totalHoursLeft.toString());

    const updatedUser = {
      Id: user.Id,
      total_hours: totalHours.toString(),
      hours_consumed: totalHoursConsumed.toString(),
      hours_left: totalHoursLeft.toString(),
    };

    async function updateUserProfile() {
      try {
        const res = await fetch('/api/users', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        if (!res.ok) {
          const error = await res.json();
          console.error('Failed to update user profile:', error);
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }

    updateUserProfile();
  }, [entries, offDays, user]);

  function totalHoursToWork(startDate: string, endDate: string) {
    const averageWorkDay = 8;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;
    const offDaysSet = new Set(offDays);

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      if (!offDaysSet.has(dateStr)) workingDays++;
      current.setDate(current.getDate() + 1);
    }

    return workingDays * averageWorkDay;
  }

  if (!users || users.length === 0) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="flex flex-row  gap-3">

        {/* Hours Consumed */}
        <div className="flex items-center gap-4 p-4 py-auto bg-white rounded-xl shadow-md border border-white">
            <div className="bg-oasis-50 p-3 rounded-full">
            <FaClock className="text-cove-600 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Hours Consumed</label>
            <div className="text-cove-500 text-3xl font-bold">{hoursConsumed}</div>
            </div>
        </div>

        {/* Hours Left */}
        <div className="flex items-center gap-4 p-4 py-auto bg-white rounded-xl shadow-md border border-white">
            <div className="bg-oasis-50 p-3 rounded-full">
            <FaHourglassHalf className="text-cove-600 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Hours Left</label>
            <div className="text-cove-500 text-3xl font-bold">{hoursLeft}</div>
            </div>
        </div>

        {/* Total Hours */}
        <div className="flex items-center gap-4 p-4 py-auto bg-white rounded-xl shadow-md border border-white">
            <div className="bg-oasis-50 p-3 rounded-full">
            <FaRegCalendarCheck className="text-cove-600 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Total Hours</label>
            <div className="text-cove-500 text-3xl font-bold">{hours}</div>
            </div>
        </div>
    </div>
  );
}
