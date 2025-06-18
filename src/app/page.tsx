'use client'
// import { Metadata } from "next"

import { redirect } from 'next/navigation';




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
  redirect('/dashboard');
}

