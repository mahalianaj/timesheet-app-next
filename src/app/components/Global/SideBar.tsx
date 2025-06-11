'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { MdOutlineSpaceDashboard } from "react-icons/md";

import {GrMenu } from 'react-icons/gr';

import { PiExportBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import App from '@/app/page';
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
    // const handleNavigation = async (e: any) => {
    //   e.preventDefault();
    //   router.push('/sendSheet')
    // }

  return (
    <>
     <SidebarContext.Provider value={{ expanded }}>
    <aside className='bg-cyan-900 '>
      <div className='p-4 flex justify-between items-center'>
      <span className={` ${expanded ? 'm-2 pl-2' : ''} font-bold text-xl text-cyan-50`}>
        <h1 >{expanded ? 'Menu' : null }</h1>
      </span>
        <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2  rounded-md hover:bg-cyan-800">
            {expanded ? <RiArrowLeftDoubleFill className='text-cyan-50 text-2xl' /> : <GrMenu className='text-cyan-50 text-2xl'/>}
          </button>
      </div>
      <div className="p-0.5 flex flex-col justify-between ">
      <ul>
    <SideBarItem text='Dashboard' Icon={MdOutlineSpaceDashboard}  route='/'/>
    <SideBarItem text='Export Timesheet' Icon={PiExportBold} route='/sendSheet'/>
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
    <li onClick={() => router.push(route)} 
    title={text}
          className={`flex items-center cursor-pointer text-cyan-50 rounded-md  hover:bg-cyan-800 hover:text-white
          ${expanded ? 'mx-2 mb-2' : 'm-3' }`}>
          <span className={` ${expanded ? 'gap-3 m-3 ' : 'justify-center m-2' } w-full items-center flex cursor-pointer  text-cyan-50 rounded-md  hover:bg-cyan-800 hover:text-white`}>
             <Icon className='text-2xl'/> {expanded ? text : null} </span> 
        </li>
  );
}

