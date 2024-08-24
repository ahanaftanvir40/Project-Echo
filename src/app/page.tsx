'use client'
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";


export default function Home() {

  return (
    <div className="bg-black min-h-screen">
  
      <NavbarComponent />
    
      <Hero/> 
    </div>
  );
}
