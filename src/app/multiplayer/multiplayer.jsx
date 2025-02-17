"use client"

import React from 'react'

function Multiplayer() {
  return (

    <section>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Multiplayer Arena</h2>
        <p className="text-neutral-400">Race against friends or join random matches</p>
      </div>

      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Quick Race</h3>
            <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">15 Online</span>
          </div>
          <p className="text-neutral-400 mb-4">Join a random match instantly with players of similar skill level</p>
          <button className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
            Join Match
          </button>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s">
          <div className="flex justify-between items-center mb-4">
     <h3 className="text-xl font-semibold text-white">Create Private Room</h3>
            <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">Custom</span>
          </div>
          <p className="text-neutral-400 mb-4">Create a private room and invite your friends to compete</p>
          <button className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
            Create Room
          </button>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Tournament</h3>
            <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Premium</span>
          </div>
          <p className="text-neutral-400 mb-4">Join competitive tournaments with prizes and rankings</p>
          <button className="w-full py-3 bg-neutral-700 text-green-400 rounded-lg font-medium hover:bg-neutral-600 transition-colors duration-200">
            View Tournaments
          </button>
        </div>
      </div>

    
      <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-3s">
        <h3 className="text-xl font-semibold text-white mb-6">Active Matches</h3>
        <div className="space-y-4">

          <div className="bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800/80 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">4/5 Players</div>
                <div className="text-neutral-400">Medium • 60s</div>
              </div>
              <button className="px-6 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
                Join
              </button>
            </div>
          </div>


          <div className="bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800/80 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">2/3 Players</div>
                <div className="text-neutral-400">Hard • 120s</div>
              </div>
              <button className="px-6 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
                Join
              </button>
            </div>
          </div>


          <div className="bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800/80 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-sm">Private</div>
                <div className="text-neutral-400">Expert • 180s</div>
              </div>
              <button className="px-6 py-2 bg-neutral-700 text-neutral-400 rounded-lg font-medium cursor-not-allowed">
                Locked
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-12 bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-4s">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Winners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-neutral-900 font-bold">1</div>
            <div>
              <div className="text-white font-semibold">SpeedDemon</div>
              <div className="text-green-400">145 WPM</div>
            </div>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div>
              <div className="text-white font-semibold">TypeMaster</div>
              <div className="text-green-400">138 WPM</div>
            </div>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div>
              <div className="text-white font-semibold">SwiftKeys</div>
              <div className="text-green-400">132 WPM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </section>

  )
}

export default Multiplayer