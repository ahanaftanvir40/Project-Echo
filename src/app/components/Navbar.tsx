'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

function NavbarComponent({ className }: { className?: string }) {

    const [active, setActive] = useState<string | null>(null);
    const { isSignedIn } = useUser()


    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>



                {isSignedIn && (
                    <MenuItem setActive={setActive} active={active}
                        component={<UserButton appearance={{
                            elements: {
                                userButtonAvatarBox: 'w-12 h-12'
                            }
                        }} />}
                        item=''>

                    </MenuItem>
                )}

                <MenuItem setActive={setActive} active={active} item='' component={<DarkModeToggle />} >
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="Services" >
                    
                </MenuItem>


                {!isSignedIn && (
                    <Link href='/sign-in'>
                        <MenuItem setActive={setActive} active={active} item="Sign In">
                        </MenuItem>
                    </Link>
                )}

            </Menu>
        </div>
    )
}

export default NavbarComponent
