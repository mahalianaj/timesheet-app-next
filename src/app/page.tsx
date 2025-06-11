'use client'
// import { Metadata } from "next"

import Login from "./components/Login"
import Navigation from "./components/Global/NavBar";
import UserBox from "./components/UserBox/UserBox";
import TimeStats from "./components/TimeStats/TimeStats";
import TimesheetTableInter from "./components/TimeSheetTable/TimesheetTableInter";

import { lazy, Suspense, useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import SideBar from "./components/Global/SideBar";


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
  return(
    <>
      <div className="flex flex-row justify-evenly py-6 bg-stone-50">
        <UserBox />
        <TimeStats/>
      </div>
      <div className="p-7 bg-stone-50 ">    
        <TimesheetTableInter/>        
      </div>
    </>
  )
}

