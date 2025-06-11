'use client'

import UserBox from "../components/UserBox/UserBox";
import TimeStats from "../components/TimeStats/TimeStats";
import TimesheetTableInter from "../components/TimeSheetTable/TimesheetTableInter";

export default function Dashboard(){
  return(
    <>
      <div className="flex flex-row justify-evenly pb-3 bg-stone-50">
        <TimeStats/>
      </div>
      <div className="p-1 bg-stone-50 ">    
        <TimesheetTableInter/>        
      </div>
    </>
  )
}
