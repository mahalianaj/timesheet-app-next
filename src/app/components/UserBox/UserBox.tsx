'use client'
import { MdPerson, MdBusiness } from "react-icons/md";
import { FaCalendar, FaFileContract, FaBuilding } from "react-icons/fa";
import { useUsers } from "@/app/hooks/useUsers";

export default function UserBox() {

  const {data: users = []} = useUsers();
  if (!users || users.length === 0) {
    return <div>Loading user info...</div>
  }

  const user: User = users[0]

  return (
    <div className="flex flex-row p-4 max-w-3xl bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-row items-center-safe pr-4 bg-blue">
        <img src={'https://avatar.iran.liara.run/public/85'} alt="profile picture" className="w-35 rounded-full object-cover mr-4 " />
      </div>
      <div className="flex flex-col w-full h-full">
        <span className="mx-1 mb-1 p-1 text-xl font-semibold">{user.consultant}</span>
        <hr className="h-px bg-gray-200 border-0" />

        <div className="flex flex-row items-center m-0.5" title="User role">
          <MdPerson className="mr-2" />
          <label>{user.role}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Company name">
          <FaBuilding className="mr-2" />
          <label>{user.company}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Contract number">
          <FaFileContract className="mr-2" />
          <label>#{user.contract_number}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Contract period">
          <FaCalendar className="mr-2" />
          <label>From {user.start_period} <br />To {user.end_period}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Customer name">
          <MdBusiness className="mr-2" />
          <label>{user.customer}</label>
        </div>

      </div>
    </div>
  )
}
