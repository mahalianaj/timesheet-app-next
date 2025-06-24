'use client'

import DefTimeStats from "../components/TimeStats/TimeStats";
import TimesheetTableInter from "../components/TimeSheetTable/TimesheetTableInter";
import Navigation from "../components/Global/NavBar";

export default function Dashboard(){
  return(
    <>
      <Navigation title='My Dashboard'/>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row justify-evenly pb-3 ">
          <DefTimeStats/>
        </div>
        <div className="flex-1 overflow-y-auto p-1">    
          <TimesheetTableInter/>        
        </div>
      </div>
    </>
  )
}
