'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import {GrMenu } from 'react-icons/gr';

type SidebarContextType = {
  expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

type SideBarProps = {
  children: ReactNode;
};

export default function SideBar({ children }: SideBarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen bg-white border-r shadow-sm flex flex-col">
        <div className="p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">{expanded ? 'Menu' : null }</h1>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2 rounded hover:bg-gray-200"
          >
            {expanded ? <RiArrowLeftDoubleFill /> : <GrMenu/>}
          </button>
        </div>
        <nav className="flex-1 px-2">{children}</nav>
      </aside>
    </SidebarContext.Provider>
  );
}

type SideBarItemProps = {
  icon: React.ReactNode;
  text: string;
};

export function SideBarItem({ icon, text }: SideBarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <div className="flex justify-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer ">
      <span className='flex items-center justify-center'>{icon}</span>
      {expanded ? text : null}
    </div>
  );
}
