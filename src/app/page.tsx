'use client'
import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const {isSignedIn} = useUser()

  if(isSignedIn){
    return router.push('/main')
  }

  return (
    <div className="bg-black min-h-screen">
      <NavbarComponent />
    
      <Hero/> 
    </div>
  );
}
