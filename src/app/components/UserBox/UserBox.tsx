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
    <div className='rounded-lg bg-cove-50 m-3 flex flex-col h-full p-0.5 '>

        <span className="mx-1 flex items-center p-1 mt-1 text-oasis-50 font-semibold"><span className="text-cove-900 mr-2">{user.consultant}</span><span className="rounded-full p-2 bg-cove-500 text-covex80-cove-8000">MJ</span></span>
        <hr className="h-px bg-cove-600 border-0 m-2" />

        <div className="flex flex-row items-center m-0.5" title="User role">
          <MdPerson className="mr-2 text-cove-800" />
          <label className="text-cove-800">{user.role}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Company name">
          <FaBuilding className="mr-2 text-cove-800" />
          <label className="text-cove-800">{user.company}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Contract number">
          <FaFileContract className="mr-2 text-cove-800" />
          <label className="text-cove-800">{user.contract_number}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Contract period">
          <FaCalendar className="mr-2 text-cove-800" />
          <label className="text-cove-800">From {user.start_period} <br />To {user.end_period}</label>
        </div>

        <div className="flex flex-row items-center mb-0.5 ml-0.5" title="Customer name">
          <MdBusiness className="mr-2 text-cove-800" />
          <label className="text-cove-800">{user.customer}</label>
        </div>

    </div>
  )
}

