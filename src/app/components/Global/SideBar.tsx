'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';

import UserBox from '../UserBox/UserBox';

import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {GrMenu } from 'react-icons/gr';
import { PiExportBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons/lib';


type SidebarContextType = {
  expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

type SideBarProps = {
  children: ReactNode;
};

export default function SideBar() { 
    const router = useRouter();
    const [expanded, setExpanded] = useState(true);

  return (
    <>
     <SidebarContext.Provider value={{ expanded }}>
    <aside className='bg-cove-900 '>
      <div className='px-4 py-3.5 flex justify-between items-center'>
      <span className={` ${expanded ? 'm-2 pl-2' : ''} font-bold text-xl text-cove-50`}>
        <h1 >{expanded ? 'Menu' : null }</h1>
      </span>
        <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2  rounded-md hover:bg-cove-800">
            {expanded ? <RiArrowLeftDoubleFill className='text-cove-50 text-2xl' /> : <GrMenu className='text-cove-50 text-2xl'/>}
          </button>
      </div>
      <hr className='text-cove-700 mx-1 mb-2.5'/>

      <div className="p-0.5 flex flex-col justify-between ">
      <ul>
      <SideBarItem text='Dashboard' Icon={MdOutlineSpaceDashboard}  route='/dashboard'/>
      <SideBarItem text='Export Timesheet' Icon={PiExportBold} route='/sendSheet'/>
      <SideBarItem text='Time Stats' Icon={IoStatsChart } route='/timeStats'/>
      <hr className='text-cove-700 mx-1 mb-2.5'/>
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

  return (
    <Tooltip title={text} placement='right'>
    <li onClick={() => router.push(route)} 
          className={`flex items-center cursor-pointer text-bg-cove-50 rounded-md  hover:bg-cove-800 hover:text-white
          ${expanded ? 'mx-2 mb-2' : 'm-3' }`}>
          <span className={` ${expanded ? 'gap-3 m-3 ' : 'justify-center m-2' } w-full items-center flex cursor-pointer  text-cove-50 rounded-md  hover:text-white`}>
             <Icon className='text-2xl'/> {expanded ? text : null} </span> 
        </li>
    </Tooltip>
  );
}

