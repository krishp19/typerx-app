import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    
  <div id="root">
  <section id="hero" className="bg-neutral-900 min-h-[70vh] pt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate__animated animate__fadeInLeft">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-6">
            Master Your <span className="text-white">Typing Speed</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl mb-8">
            Challenge yourself, compete with others, and become a typing champion. Track your progress and climb the global leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href={'/arena'} className="px-8 py-4 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200 animate__animated animate__fadeInUp">
              Start Typing Test
            </Link>
            <Link href={"/multiplayer"} className="px-8 py-4 border border-green-400 text-green-400 rounded-lg font-medium hover:bg-green-400/10 transition-colors duration-200 animate__animated animate__fadeInUp animate__delay-1s">
              Join Multiplayer
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-neutral-400">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>Real-time Racing</span>
            </div>
          </div>
        </div>
        <div className="relative animate__animated animate__fadeInRight">
          <div className="bg-neutral-800/50 p-6 rounded-xl backdrop-blur-sm border border-neutral-700">
            <div className="font-mono text-green-400 text-lg">
              <div className="mb-4 text-neutral-400">Type the text below:</div>
              <div className="bg-neutral-800 p-4 rounded-lg">
                <span className="text-green-400">The quick brown fox</span>
                <span className="text-neutral-600"> jumps over the lazy dog.</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>WPM: <span className="text-white">0</span></div>
                <div>Accuracy: <span className="text-white">100%</span></div>
                <div>Time: <span className="text-white">60s</span></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  </section>
</div>

<div id="root">
  <section id="features" className="bg-neutral-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
          Powerful Features to Enhance Your Typing Skills
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Everything you need to improve your typing speed and compete with others worldwide
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Real-time Speed Tracking</h3>
          <p className="text-neutral-400">Monitor your WPM, accuracy, and progress in real-time with detailed analytics and performance metrics.</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Multiplayer Races</h3>
          <p className="text-neutral-400">Challenge friends or random players worldwide in exciting real-time typing competitions.</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Global Leaderboard</h3>
          <p className="text-neutral-400">Compete for top positions on our global leaderboard and track your ranking among other typists.</p>
        </div>


        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Custom Practice Modes</h3>
          <p className="text-neutral-400">Choose from various text types and difficulty levels to practice and improve systematically.</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Progress History</h3>
          <p className="text-neutral-400">Track your improvement over time with detailed statistics and performance graphs.</p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-green-400 transition-colors duration-300 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Achievement System</h3>
          <p className="text-neutral-400">Earn badges and achievements as you improve and reach new typing milestones.</p>
        </div>
      </div>
    </div>
  </section>
</div>
    </>
  );
}
