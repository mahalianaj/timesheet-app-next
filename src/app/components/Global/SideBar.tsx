'use client';

import { useState, createContext, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';

import UserBox from '../UserBox/UserBox';

import { RiArrowLeftDoubleFill } from 'react-icons/ri';
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {GrMenu } from 'react-icons/gr';
import { PiExportBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons/lib';

import { useNavigationGuard } from '@/app/hooks/NavigationGuardContext';


type SidebarContextType = {
  expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({ expanded: true });


export default function SideBar() { 
    const [expanded, setExpanded] = useState(true);

  return (
    <>
     <SidebarContext.Provider value={{ expanded }}>
    <aside className='bg-custom-100 rounded-xl m-1 ring-100 ring-custom-200'>
      <div className='px-4 py-3.5 flex justify-between items-center'>
      <span className={` ${expanded ? 'm-2 pl-2' : ''} font-bold text-xl text-cove-50`}>
        <h1 >{expanded ? 'Menu' : null }</h1>
      </span>
        <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2  rounded-md hover:bg-custom-200">
            {expanded ? <RiArrowLeftDoubleFill className='text-cove-50 text-2xl' /> : <GrMenu className='text-cove-50 text-2xl'/>}
          </button>
      </div>
      <hr className='text-cove-900 mx-1 mb-2.5'/>

      <div className="p-0.5 flex flex-col justify-between ">
      <ul>
      <SideBarItem text='Dashboard' Icon={MdOutlineSpaceDashboard}  route='/dashboard'/>
      <SideBarItem text='Export Timesheet' Icon={PiExportBold} route='/sendSheet'/>
      <SideBarItem text='Time Stats' Icon={IoStatsChart } route='/timeStats'/>
      <hr className='text-cove-900 mx-1 mb-2.5'/>
      {expanded ? <UserBox/> : ''}
      </ul>
      </div>
    </aside>
    </SidebarContext.Provider>

    </>
  );
}

type SideBarItemProps = {
  Icon: IconType;
  text: string;
  route: string;
};

function SideBarItem({ Icon, text, route }: SideBarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  const { hasUnsavedChanges } = useNavigationGuard();

    const handleNavigation = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmLeave) return;
    }

    router.push(route);
  };


  return (
    <Tooltip title={text} placement='right'>
    <li onClick={handleNavigation} 
          className={`flex items-center cursor-pointer rounded-md hover:bg-linear-55 from-malachite-500 to-ntb-800 hover:text-white 
          ${expanded ? 'mx-2 mb-2' : 'm-3' }`}>
          <span className={` ${expanded ? 'gap-3 m-3 ' : 'justify-center m-2' } w-full items-center flex cursor-pointer  text-cove-50 rounded-md  hover:text-white`}>
             <Icon className='text-2xl'/> {expanded ? text : null} </span> 
        </li>
    </Tooltip>
  );
}

