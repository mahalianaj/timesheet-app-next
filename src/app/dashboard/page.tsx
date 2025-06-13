'use client'

import UserBox from "../components/UserBox/UserBox";
import DefTimeStats from "../components/TimeStats/TimeStats";
import TimesheetTableInter from "../components/TimeSheetTable/TimesheetTableInter";
import Navigation from "../components/Global/NavBar";

export default function Dashboard(){
  return(
    <>
      <Navigation title="My Dashboard"/>
      <div className="flex flex-row justify-evenly pb-3 bg-stone-50">
        <DefTimeStats/>
      </div>
      <div className="p-1 bg-stone-50 ">    
        <TimesheetTableInter/>        
      </div>
    </>
  )
}
