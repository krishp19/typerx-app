"use client"

import { UserButton, useUser } from "@clerk/clerk-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import UserButton to prevent SSR issues
const UserButtonClientSide = dynamic(() => import("@clerk/clerk-react").then(mod => mod.UserButton), {
  ssr: false,
});

export default function CustomNavbar() {
  const { user, isLoaded } = useUser(); // Get user state

  return (
    <>
      <nav className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/logo.webp" alt="GFG logo" width={50} height={50} />
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-8">
              {isLoaded ? (
                <>
                  <NavItem href="/" text="Home" />
                  <NavItem href="/arena" text="Arena" />
                  <NavItem href="/board" text="Leaderboard" />
                  {user && <NavItem href="/multiplayer" text="Multiplayer" />}
                  <NavItem href="/practice" text="Practice" />
                  {user && <NavItem href="/stats" text="Statistics" />}
                </>
              ) : (
                // Skeleton loader for navbar links
                [...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 w-24 bg-neutral-700 animate-pulse rounded-lg"></div>
                ))
              )}
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoaded ? (
                user ? (
                  <UserButtonClientSide />
                ) : (
                  <>
                    <NavItem href="/login" text="Login" />
                    <NavItem href="/sign-up" text="Sign Up" />
                  </>
                )
              ) : (
                // Skeleton for user profile button
                <div className="h-10 w-10 bg-neutral-700 animate-pulse rounded-full"></div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button id="mobile-menu-button" className="px-4 py-2 text-green-400">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-neutral-900 border-t border-neutral-800">
            <NavItem href="/arena" text="Arena" />
            <NavItem href="/board" text="Leaderboard" />
            {user && <NavItem href="/multiplayer" text="Multiplayer" />}
            <NavItem href="/practice" text="Practice" />
            {user && <NavItem href="/stats" text="Statistics" />}
            <div className="pt-4 pb-3 border-t border-neutral-800">
              {user ? (
                <UserButtonClientSide />
              ) : (
                <>
                  <NavItem href="/login" text="Login" />
                  <NavItem href="/sign-up" text="Sign Up" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// Reusable NavItem Component
function NavItem({ href, text }) {
  return (
    <Link
      href={href}
      className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      {text}
    </Link>
  );
}
