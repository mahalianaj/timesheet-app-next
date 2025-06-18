'use client'

import LoginForm from "./components/auth/LoginForm"
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import { Metadata } from "next"
// import { redirect } from 'next/navigation';


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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e2f',
      paper: '#2d3142',
    },
    text: {
      primary: '#f4f7fa',
      secondary: '#cbd5e1',
    },
  },
});

export default function App(){
  return (
    <LoginForm/>

  )
  // redirect('/dashboard');
}

