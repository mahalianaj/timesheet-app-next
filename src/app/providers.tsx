'use client'

import {useState} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SideBar from './components/Global/SideBar';
import Navigation from './components/Global/NavBar'; 

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
          <div className="flex h-screen">
          {/* Sidebar always visible */}
          <SideBar />

          {/* Main content area */}
          {/* <div className="flex flex-col flex-grow">
            {/* Header always visible */}
            {/* <Navigation title="" />  */}

            {/* Page content injected here */}
            <main className="flex-grow overflow-auto p-4 bg-oasis-50">
              {children}
            </main>
          {/* </div> */}
        </div>
        </QueryClientProvider>
  )
}