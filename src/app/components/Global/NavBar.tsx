import { FaRegCalendarAlt } from "react-icons/fa";

interface NavigationProps {
  title: string;
}

export default function Navigation({title}: NavigationProps) {
  const today = new Date();
  const dateString = today.toDateString();

  return (
    <nav className="  flex  justify-between items-center px-3 pb-5">
        <span className="text-xl font-extrabold flex justify-start tracking-wide text-cove-800 select-none">
          {title}
        </span>
        <div className=" items-center justify-end align-">
        <div className="flex items-center space-x-2 bg-cove-600 text-cove-50 rounded-lg px-4 py-2 font-semibold font-sans select-none">
          <FaRegCalendarAlt className="text-lg" />
          <span>Today is {dateString}</span>
        </div>
        </div>
    </nav>
  );
}
