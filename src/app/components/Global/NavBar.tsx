import { FaRegCalendarAlt } from "react-icons/fa";

interface NavigationProps {
  title: string;
}

export default function Navigation({title}: NavigationProps) {
  const today = new Date();
  const dateString = today.toDateString();

  return (
    <nav className="  flex  justify-between items-center px-3 pb-5">
        <span className="text-xl font-extrabold flex justify-start tracking-wide text-cove-100 drop-shadow-[0_1.5px_1.2px_rgba(0,0,0,0.8)] ">
          {title}
        </span>
        <div className=" items-center justify-end align-">
        <div className="flex items-center space-x-2 bg-custom-100 text-custom-500 rounded-lg px-4 py-2 font-semibold font-sans select-none">
          <FaRegCalendarAlt className="text-lg" />
          <span>Today is {dateString}</span>
        </div>
        </div>
    </nav>
  );
}
