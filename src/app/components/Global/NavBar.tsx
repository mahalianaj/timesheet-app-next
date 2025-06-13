import { FaRegCalendarAlt } from "react-icons/fa";

export default function Navigation(props: any) {
  let today = new Date();
  const dateString = today.toDateString();

  return (
    <nav className="  flex  justify-between items-center px-3 pb-5">
        <span className="text-xl font-extrabold flex justify-start tracking-wide text-cove-900 select-none">
          {props.title}
        </span>
        <div className=" items-center justify-end align-">
        <div className="flex items-center space-x-2 bg-cove-500 text-cove-50 rounded-lg px-4 py-2 font-semibold font-sans select-none">
          <FaRegCalendarAlt className="text-lg" />
          <span>Today is {dateString}</span>
        </div>
        </div>
    </nav>
  );
}
