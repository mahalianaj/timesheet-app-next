'use client'
import { useState, useEffect } from "react";
import { FaClock, FaHourglassHalf, FaRegCalendarCheck } from "react-icons/fa";

export default function TimeStats({ users }: { users?: User[] }) {
  const [offDays, setOffDays] = useState<string[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [hours, setHours] = useState<string>('');
  const [hoursConsumed, setHoursConsumed] = useState<string>('');
  const [hoursLeft, setHoursLeft] = useState<string>('');
  const user = users?.[0];

  useEffect(() => {
    async function fetchData() {
      try {
        const [offDaysRes, entriesRes] = await Promise.all([
          fetch('/api/off_days'),
          fetch('/api/entries')
        ]);

        if (!offDaysRes.ok || !entriesRes.ok) {
          throw new Error('One or more failed to fetch');
        }

        const offDaysData = await offDaysRes.json();
        const entriesData = await entriesRes.json();

        setOffDays(offDaysData.list);
        setEntries(entriesData.list);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);

useEffect(() => {
  if (!user) return;
  let totalHours = totalHoursToWork(startDate, endDate);
  let totalHoursConsumed  = entries.reduce((sum, row) => sum + Number(row.hours), 0);
  let totalHoursLeft = totalHours - totalHoursConsumed; 
  const string1= totalHours.toString();
  const string2 = totalHoursConsumed.toString();
  const string3 = totalHoursLeft.toString();
  setHours(string1);
  setHoursConsumed(string2);
  setHoursLeft(string3);

   if (
    totalHours.toString() === hours &&
    totalHoursConsumed.toString() === hoursConsumed &&
    totalHoursLeft.toString() === hoursLeft
  ) {
    return
  };

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
  console.log("Updating user profile for:", user);

  updateUserProfile();
}, [entries, offDays, user]);


  if (!users || users.length === 0) {
    return <div>Loading user info...</div>
  }
  const startDate = user.start_period;
  const endDate = user.end_period;

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

 

  return (
    <div className="flex flex-row gap-3">

        {/* Total Hours */}
        <div className="flex items-center gap-4 px-4 pt-4 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="bg-rose-50 p-3 rounded-full">
            <FaRegCalendarCheck className="text-blue-950 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Total Hours</label>
            <div className="text-black text-3xl font-bold">{hours}</div>
            </div>
        </div>

        <div className="flex flex-col gap-3 justify-between">


        {/* Hours Consumed */}
        <div className="flex items-center gap-4 p-4 py-auto bg-white rounded-xl shadow-md border border-gray-200">
            <div className="bg-rose-50 p-3 rounded-full">
            <FaClock className="text-cyan-950 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Hours Consumed</label>
            <div className="text-cyan-950 text-3xl font-bold">{hoursConsumed}</div>
            </div>
        </div>

        {/* Hours Left */}
        <div className="flex items-center gap-4 p-4 py-auto bg-white rounded-xl shadow-md border border-gray-200">
            <div className="bg-rose-50 p-3 rounded-full">
            <FaHourglassHalf className="text-cyan-950 text-2xl" />
            </div>
            <div>
            <label className="text-gray-500">Hours Left</label>
            <div className="text-black text-3xl font-bold">{hoursLeft}</div>
            </div>
        </div>

        </div>
    </div>
  );
}
