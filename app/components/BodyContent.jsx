"use client"
import { SessionProvider } from 'next-auth/react'
// import MobileNavbar from "./MobileNavbar"
import React from 'react'

export default function BodyContent({childreen}) {
  return (
    <div> <SessionProvider>
    {/* <MobileNavbar /> */}
    {childreen}
    </SessionProvider>
   </div>
  )
}
