"use client"
import React from "react";

function Arena(){
    return(
        <div >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Typing Realm</h2>
        <p className="text-neutral-400">Test your typing speed and accuracy in real-time</p>
      </div>

      <div className="bg-neutral-800 rounded-xl p-8 max-w-4xl mx-auto shadow-lg border border-neutral-700 animate__animated animate__fadeInUp">
     
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-6">
            <div className="text-green-400">
              <span className="text-sm">WPM</span>
              <div className="text-2xl font-mono" id="wpm-counter">0</div>
            </div>
            <div className="text-green-400">
              <span className="text-sm">Accuracy</span>
              <div className="text-2xl font-mono" id="accuracy-counter">0%</div>
            </div>
          </div>
          <div className="text-green-400">
            <span className="text-sm">Time</span>
            <div className="text-2xl font-mono" id="timer">60</div>
          </div>
        </div>

    
        <div className="bg-neutral-900 p-6 rounded-lg mb-6">
          <p id="text-display" className="text-lg font-mono leading-relaxed text-neutral-400">
            Start typing to begin the test...
          </p>
        </div>

        <div className="relative">
          <textarea
            id="typing-input"
            className="w-full bg-neutral-900 text-green-400 rounded-lg p-4 font-mono focus:outline-none focus:ring-2 focus:ring-green-400 border border-neutral-700"
            rows="3"
            placeholder="Click here and start typing..."
          ></textarea>
        </div>

       
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-4">
            <button id="reset-btn" className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors duration-200">
              Reset
            </button>
            <select id="difficulty" className="bg-neutral-700 text-white rounded px-4 py-2 hover:bg-neutral-600 transition-colors duration-200">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button id="challenge-btn" className="px-6 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
            Challenge Friends
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
        <div className="bg-neutral-800 p-4 rounded-lg text-center animate__animated animate__fadeInUp">
          <div className="text-sm text-neutral-400">Best Speed</div>
          <div className="text-2xl text-green-400 font-mono">0 WPM</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center animate__animated animate__fadeInUp animate__delay-1s">
          <div className="text-sm text-neutral-400">Tests Taken</div>
          <div className="text-2xl text-green-400 font-mono">0</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center animate__animated animate__fadeInUp animate__delay-2s">
          <div className="text-sm text-neutral-400">Avg. Accuracy</div>
          <div className="text-2xl text-green-400 font-mono">0%</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center animate__animated animate__fadeInUp animate__delay-3s">
          <div className="text-sm text-neutral-400">Global Rank</div>
          <div className="text-2xl text-green-400 font-mono">#0</div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Arena;