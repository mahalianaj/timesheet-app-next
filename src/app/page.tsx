'use client'
// import { Metadata } from "next"
import { Button } from "./components/Button/Button"

import Login from "./components/Login"
import SideBar, { SideBarItem } from './components/Global/SideBar'; 
import { LiaBusinessTimeSolid } from "react-icons/lia";
import MyForm from "./components/Form/Form";
import UserBox from "./components/UserBox/UserBox";
import TimeStats from "./components/TimeStats/TimeStats";
import { useEffect, useState } from "react"
import TimesheetTable from "./components/TimeSheetTable/TimesheetTable";
import TanStackTable from "./components/TimeSheetTable/InteractiveTable";
import Navigation from "./components/Global/NavBar";


// export const metadata: Metadata = {
//   title: "Timesheet App",
//   twitter: {
//     card: "summary_large_image",
//   },
//   openGraph: {
//     url: "https://next-enterprise.vercel.app/",
//     images: [
//       {
//         width: 1200,
//         height: 630,
//         url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
//       },
//     ],
//   },
// }


export default function App(){
  const [users, setUsers] = useState<User[]>([]);
    
        useEffect(() => {
            async function fetchEntries() {
              const res = await fetch('/api/users')
              const data = await res.json()
              console.log('Fetched users: ', data);
              setUsers(data.list);
            }
            fetchEntries();
        }, []);

  return(
   <>
      <Navigation/>
      <div className="flex flex-row justify-evenly">
        <UserBox users={users}/>
        <TimeStats users={users}/>
      </div>
   </>
  )
}



// export default function App(){
//   const [users, setUsers] = useState<User[]>([]);
    
//         useEffect(() => {
//             async function fetchEntries() {
//               const res = await fetch('/api/users')
//               const data = await res.json()
//               console.log('Fetched users: ', data);
//               setUsers(data.list);
//             }
//             fetchEntries();
//         }, []);
        
//   return(
//     <>
//     <div className="flex h-full">
//       {/* <SideBar>
//         <SideBarItem icon={<LiaBusinessTimeSolid  />} text="Timesheet" />
//       </SideBar> */}
//       <div className="flex flex-col h-full w-full border-amber-600 border-solid">
//         <Header></Header>
//         <div className="flex flex-col h-full w-full px-4 ">
//           <div className="flex flex-row h-full w-full justify-end align-bottom">

//           <UserBox users={users}></UserBox>
//           <TimeStats users={users}></TimeStats>
//           </div>
//            <div className="flex flex-row h-full w-full justify-between">
//             <MyForm></MyForm> 
//             <TimesheetTable/>
//             {/* <TanStackTable/> */}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }
