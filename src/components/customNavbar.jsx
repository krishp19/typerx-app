"use client"

import { UserButton, useUser } from "@clerk/clerk-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import the UserButton component with SSR disabled
const UserButtonClientSide = dynamic(() => import("@clerk/clerk-react").then(mod => mod.UserButton), {
  ssr: false,
});

export default function CustomNavbar() {
  const { user, isLoaded } = useUser(); // Use Clerk's useUser hook to get the user state

  // Show a loading state while Clerk user data is being loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="el-e1uoqqjy">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
              <Image src="/logo.webp" alt="GFG logo" width={50} height={50} />
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Home</Link>
                <Link href="/arena" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Arena</Link>
                <Link href="/board" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Leaderboard</Link>
                <Link href="/multiplayer" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Multiplayer</Link>
                <Link href="/practice" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Practice</Link>
                <Link href="/stats" className="relative text-green-400 hover:text-green-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Statistics</Link>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {/* Conditionally render the UserButton if the user is logged in */}
                {user ? (
                  <UserButtonClientSide />
                ) : (
                  <>
                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                    <Link href="/sign-up" className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
                      Sign Up
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  </>
                )}
              </div>

              <div className="md:hidden">
                <button id="mobile-menu-button" className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-neutral-900 border-t border-neutral-800" id="el-nlj27dfa">
              <a href="#typingArena" className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200" id="el-6ma1zjsk">Typing Arena</a>
              <a href="#leaderboard" className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200" id="el-madbgq5t">Leaderboard</a>
              <a href="#multiplayer" className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200" id="el-5h8mtv1i">Multiplayer</a>
              <a href="#practice" className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200" id="el-04yxeqcg">Practice</a>
              <a href="#statistics" className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200" id="el-bklgfvmp">Statistics</a>
              <div className="pt-4 pb-3 border-t border-neutral-800" id="el-d0tiygq2">
                <Link href="/login" className="w-full px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors duration-200" id="el-4sdi91q0">Login</Link>
                <Link href="/sign-up" className="w-full mt-2 px-4 py-2 text-sm font-medium bg-green-500 text-neutral-900 rounded-lg hover:bg-green-400 transition-colors duration-200" id="el-mmjzfk1d">Sign Up</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
