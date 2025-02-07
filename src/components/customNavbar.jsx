"use client"

import Link from "next/link"

export default function CustomNavbar() {


    return(
        <>
        <div>
           <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="el-e1uoqqjy">
  <div className="flex justify-between items-center h-16">
    <div className="flex-shrink-0">
      
    </div>

    <div className="hidden md:flex items-center space-x-8">
    <Link href="/" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Home </Link> 
    <Link href="/arena" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Arena </Link> 
    <Link href="/board" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Leaderboard </Link> 
    <Link href="/multiplayer" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Multiplayer </Link> 
    <Link href="/practice" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Practice </Link> 
    <Link href="/stats" className="text-green-400 hover:text-green-300 transition-colors duration-200"> Statistics </Link> 
    </div>


    <div className="hidden md:flex items-center space-x-4">

        <button className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
          Logout
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
        </button>
 

      <button className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
      </button>
        <>
        <Link href={'/login'} className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
        Login
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
      </Link>
      <Link href={'/sign-up'} className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 relative hover:transform hover:-translate-y-0.5 group">
        Sign Up
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-200 group-hover:w-full"></span>
      </Link></>
      
      

      
      
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
          <Link href={'/login'} className="w-full px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors duration-200" id="el-4sdi91q0">Login</Link>
          <Link href={'/sign-up'} className="w-full mt-2 px-4 py-2 text-sm font-medium bg-green-500 text-neutral-900 rounded-lg hover:bg-green-400 transition-colors duration-200" id="el-mmjzfk1d">Sign Up</Link>
        </div>
      </div>
    </div>
  </nav> 
  </div>
  
        </>
    )
}


