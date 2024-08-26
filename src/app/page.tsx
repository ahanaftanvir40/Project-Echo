'use client'
import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import { redirect } from "next/navigation";


export default function Home() {
  const {isSignedIn} = useUser()

  if(isSignedIn){
    return redirect('/main')
  }

  return (
    <div className="bg-black min-h-screen">
      <NavbarComponent />
    
      <Hero/> 
    </div>
  );
}
