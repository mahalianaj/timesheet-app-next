'use client'

import {useState} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SideBar from './components/Global/SideBar';

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
            <main className="flex-grow overflow-auto px-4 bg-custom-200">
              {children}
            </main>
          {/* </div> */}
        </div>
        </QueryClientProvider>
  )
}