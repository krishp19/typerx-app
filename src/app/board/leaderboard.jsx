"use client"

import { useEffect, useState } from "react";

function Leaderboard(){

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

    return(
        <div>
            <div id="root">
  <section id="leaderboard" className="bg-neutral-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Global Leaderboard</h2>
        <p className="text-neutral-400">Compete with the fastest typists worldwide</p>
      </div>


      <div className="bg-neutral-900 rounded-lg p-4 mb-8 animate__animated animate__fadeInUp">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-4">
            <select className="bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="allTime">All Time</option>
            </select>
            <select className="bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400">
              <option value="global">Global</option>
              <option value="regional">Regional</option>
              <option value="friends">Friends</option>
            </select>
          </div>
          <div className="relative">
            <input type="search" placeholder="Search players..." className="bg-neutral-800 text-green-400 rounded-lg pl-10 pr-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

  
      <div className="bg-neutral-900 rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-800">
            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Rank</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Player</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">WPM</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Accuracy</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Tests</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <tr key={user.userId} className="bg-green-400/5 hover:bg-neutral-800/50 transition-colors duration-200">
                <td className="px-6 py-4 text-yellow-400 font-bold">#{index + 1}</td>
                <td className="px-6 py-4 text-white">{user.username || "Anonymous"}</td>
                <td className="px-6 py-4 text-green-400">{user.averageWpm}</td>
                <td className="px-6 py-4 text-green-400">{user.averageAccuracy}%</td>
                <td className="px-6 py-4 text-neutral-400">{user.totalSessions}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-neutral-400">
                No leaderboard data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  </section>
</div>
        </div>
    )
}

export default Leaderboard;