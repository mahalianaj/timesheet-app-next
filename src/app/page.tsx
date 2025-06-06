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

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

const queryClient = new QueryClient();



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
      <Navigation title={""}/>
      <div className="flex flex-row justify-evenly py-6 bg-stone-50">
        <UserBox users={users}/>
        <TimeStats users={users}/>
      </div>
      <div className="p-7 bg-stone-50 ">
        <QueryClientProvider client={queryClient}>
        <TimesheetTableInter/>
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        </QueryClientProvider>
      </div>
   </>
  )
}

