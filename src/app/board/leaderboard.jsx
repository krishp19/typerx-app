"use client";

import { useEffect, useState } from "react";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("allTime");
  const [scopeFilter, setScopeFilter] = useState("global");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/leaderboard");
        const data = await res.json();

        // Sorting players by WPM, then Accuracy, then Total Sessions
        const sortedData = data.sort((a, b) => {
          if (b.averageWpm !== a.averageWpm) {
            return b.averageWpm - a.averageWpm;
          } else if (b.averageAccuracy !== a.averageAccuracy) {
            return b.averageAccuracy - a.averageAccuracy;
          } else {
            return b.totalSessions - a.totalSessions;
          }
        });

        setLeaderboard(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Filter players based on search query
  const filteredPlayers = leaderboard.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredPlayers.length / playersPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-neutral-800 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 bg-neutral-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">Filters</h2>

          {/* Time Filter Dropdown */}
          <div className="mb-4">
            <label className="block text-green-400 text-sm mb-2">Time Filter</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="allTime">All Time</option>
            </select>
          </div>

          {/* Scope Dropdown */}
          <div className="mb-4">
            <label className="block text-green-400 text-sm mb-2">Scope</label>
            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
              className="w-full bg-neutral-800 text-green-400 rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"
            >
              <option value="global">Global</option>
              <option value="regional">Regional</option>
              <option value="friends">Friends</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800 text-green-400 rounded-lg pl-10 pr-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </aside>

        {/* Leaderboard Table */}
        <main className="lg:col-span-9 bg-neutral-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-green-400 text-center mb-6">
             Ultimate Typing Leaderboard 
          </h2>

          <div className="overflow-x-auto">
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-green-400">
                      Loading...
                    </td>
                  </tr>
                ) : currentPlayers.length > 0 ? (
                  currentPlayers.map((user, index) => (
                    <tr key={user.userId} className="hover:bg-neutral-800/50 transition-colors">
                      <td className={`px-6 py-4 font-bold ${
                        indexOfFirstPlayer + index === 0 ? "text-yellow-400" :
                        indexOfFirstPlayer + index === 1 ? "text-gray-400" :
                        indexOfFirstPlayer + index === 2 ? "text-orange-400" : "text-white"
                      }`}>
                        #{indexOfFirstPlayer + index + 1}
                      </td>
                      <td className="px-6 py-4 text-white">{user.username}</td>
                      <td className="px-6 py-4 text-green-400">{Math.round(user.averageWpm)}</td>
                      <td className="px-6 py-4 text-green-400">{Math.round(user.averageAccuracy)}%</td>
                      <td className="px-6 py-4 text-neutral-400">{user.totalSessions}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-neutral-400">No leaderboard data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-neutral-700 text-green-400 rounded-lg hover:bg-neutral-600 disabled:opacity-50">
              Prev
            </button>
            <span className="text-green-400">Page {currentPage}</span>
            <button onClick={nextPage} disabled={indexOfLastPlayer >= filteredPlayers.length} className="px-4 py-2 bg-neutral-700 text-green-400 rounded-lg hover:bg-neutral-600 disabled:opacity-50">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Leaderboard;
