import { FaRegCalendarAlt } from "react-icons/fa";

export default function Navigation() {
  let today = new Date();
  const dateString = today.toDateString();

  return (
    <nav className="bg-zorba-950 border-b border-gray-300 shadow-sm mb-5">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <span className="text-3xl font-extrabold tracking-wide text-rose-100 select-none">
          Timesheet App
        </span>

        <div className="flex items-center space-x-2 bg-rose-50 text-black rounded-lg px-4 py-2 font-semibold font-sans select-none">
          <FaRegCalendarAlt className="text-lg" />
          <span>Today is {dateString}</span>
        </div>
      </div>
    </nav>
  );
}
