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
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href=""
                            src=""
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href=""
                            src=""
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href=""
                            src=""
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href=""
                            src=""
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
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
