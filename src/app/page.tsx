import Image from "next/image";
import Link from "next/link";

const Metadata = {
  
}

export default function Home() {
  return (
    <>
    
  <div id="root">
  <section id="hero" className="bg-neutral-900 min-h-[70vh] pt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate__animated animate__fadeInLeft">
        <h1 className="text-4xl md:text-5xl font-serif text-green-400 mb-6 cursor typewriter-animation">
          Master Your <span className="mb-4 text-neutral-400 animate-pulse">Typing Skills</span>    
        </h1>
          <p className="text-neutral-400 text-lg md:text-xl mb-8">
            Challenge yourself, compete with others, and become a typing champion. Track your progress and climb the global leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
          href={'/arena'}
          className="relative px-8 py-4 bg-green-500 text-neutral-900 rounded-lg font-medium transition-all duration-300 hover:bg-green-400 shadow-lg hover:shadow-green-400/50 overflow-hidden group"
          >
          <span className="absolute inset-0 border-2 border-green-300 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-50 rounded-lg"></span>
            Start Typing Test
          </Link>

          <Link
          href={"/multiplayer"}
          className="relative px-8 py-4 border-2 border-green-400 text-green-400 rounded-lg font-medium transition-all duration-300 hover:text-green-300 hover:border-green-300 shadow-md hover:shadow-green-400/50 overflow-hidden group"
          >
          <span className="absolute inset-0 border-2 border-green-300 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-50 rounded-lg"></span>
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
  {/* Outer Card with Glowing Border Animation */}
  <div className="bg-neutral-800/50 p-6 rounded-xl backdrop-blur-sm border border-neutral-700 relative overflow-hidden group">
    
    {/* Animated Border Effect */}
    <div className="absolute inset-0 border-2 border-green-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    {/* Floating Particles Effect */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-8 left-1/4 w-16 h-16 bg-green-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </div>

    {/* Text Container */}
    <div className="font-mono text-green-400 text-lg">
      <div className="mb-4 text-neutral-400 animate-pulse">Type the text below:</div>
      <div className="bg-neutral-800 p-4 rounded-lg border border-green-500/30 transition-all duration-300 hover:border-green-500">
        <span className="text-green-400">The quick brown fox</span>
        <span className="text-neutral-600"> jumps over the lazy dog.</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="transition-transform duration-300 group-hover:scale-105">
          WPM: <span className="text-white">0</span>
        </div>
        <div className="transition-transform duration-300 group-hover:scale-105">
          Accuracy: <span className="text-white">100%</span>
        </div>
        <div className="transition-transform duration-300 group-hover:scale-105">
          Time: <span className="text-white">60s</span>
        </div>
      </div>
    </div>
  </div>

  {/* Floating Glows with Pulsing Effect */}
  <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
</div>

      </div>
    </div>
  </section>
</div>

<div id="root">
<section id="features" className="bg-neutral-800 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-16 animate__animated animate__fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4 transition-all duration-300 hover:scale-105 hover:text-green-300 animate__animated animate__shakeX">
        Powerful Features to <span className="glitch">Enhance</span> Your Typing Skills
      </h2>
      <p className="text-neutral-400 max-w-2xl mx-auto transition-all duration-300 hover:scale-105 hover:text-green-200">
        Everything you need to improve your typing speed and compete with others worldwide.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Real-time Speed Tracking",
          description: "Monitor your WPM, accuracy, and progress in real-time with detailed analytics and performance metrics.",
          iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Multiplayer Races",
          description: "Challenge friends or random players worldwide in exciting real-time typing competitions.",
          iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        },
        {
          title: "Global Leaderboard",
          description: "Compete for top positions on our global leaderboard and track your ranking among other typists.",
          iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        },
        {
          title: "Custom Practice Modes",
          description: "Choose from various text types and difficulty levels to practice and improve systematically.",
          iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        },
        {
          title: "Progress History",
          description: "Track your improvement over time with detailed statistics and performance graphs.",
          iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Achievement System",
          description: "Earn badges and achievements as you improve and reach new typing milestones.",
          iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        }
      ].map((feature, index) => (
        <div
          key={index}
          className="relative bg-neutral-900 p-6 rounded-xl border border-neutral-700 transition-all duration-300
            hover:border-green-400 hover:shadow-[0px_0px_25px_rgba(34,197,94,0.5)] hover:-translate-y-1 hover:scale-105 
            group overflow-hidden cursor-pointer animate__animated animate__fadeInUp animate__delay-${index}s"
        >
          {/* Hover Light Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-green-400/10 blur-3xl"></div>

          {/* Icon Section */}
          <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
            </svg>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-neutral-400 group-hover:text-white transition-colors duration-300">
            {feature.description}
          </p>

          {/* Neon Glow Borders */}
          <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 border border-green-400/30 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

</div>
    </>
  );
}
