import React from 'react'

function Practice() {
  return (
    <>
    <section id="practice" className="bg-neutral-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Practice Zone</h2>
        <p className="text-neutral-400">Improve your typing skills with customized practice sessions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Basic Training</h3>
          <p className="text-neutral-400 mb-4">Perfect for beginners. Start with simple texts and basic keyboard exercises.</p>
          <div className="flex justify-between items-center">
            <span className="text-green-400">Level 1-10</span>
            <button className="px-4 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">Start</button>
          </div>
        </div>

      
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Practice</h3>
          <p className="text-neutral-400 mb-4">Complex texts and challenging exercises for experienced typists.</p>
          <div className="flex justify-between items-center">
            <span className="text-green-400">Level 11-20</span>
            <button className="px-4 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">Start</button>
          </div>
        </div>


        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Custom Practice</h3>
          <p className="text-neutral-400 mb-4">Create your own practice sessions with custom text and settings.</p>
          <div className="flex justify-between items-center">
            <span className="text-green-400">Customizable</span>
            <button className="px-4 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">Create</button>
          </div>
        </div>
      </div>


      <div className="bg-neutral-900 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-3s">
        <h3 className="text-xl font-semibold text-white mb-6">Specialized Practice</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors duration-200">
            <div className="text-green-400 font-semibold mb-2">Numbers</div>
            <div className="text-neutral-400 text-sm">Master numeric typing</div>
          </button>
          <button className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors duration-200">
            <div className="text-green-400 font-semibold mb-2">Symbols</div>
            <div className="text-neutral-400 text-sm">Special characters</div>
          </button>
          <button className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors duration-200">
            <div className="text-green-400 font-semibold mb-2">Code</div>
            <div className="text-neutral-400 text-sm">Programming syntax</div>
          </button>
          <button className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors duration-200">
            <div className="text-green-400 font-semibold mb-2">Quotes</div>
            <div className="text-neutral-400 text-sm">Famous passages</div>
          </button>
        </div>
      </div>


      <div className="mt-12 bg-neutral-900 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-4s">
        <h3 className="text-xl font-semibold text-white mb-6">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="text-neutral-400 mb-2">Practice Sessions</div>
            <div className="text-2xl text-green-400 font-bold">124</div>
            <div className="mt-2 text-sm text-neutral-500">Last 30 days</div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="text-neutral-400 mb-2">Time Practiced</div>
            <div className="text-2xl text-green-400 font-bold">12.5 hrs</div>
            <div className="mt-2 text-sm text-neutral-500">Last 30 days</div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="text-neutral-400 mb-2">Speed Improvement</div>
            <div className="text-2xl text-green-400 font-bold">+15 WPM</div>
            <div className="mt-2 text-sm text-neutral-500">Last 30 days</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Practice
