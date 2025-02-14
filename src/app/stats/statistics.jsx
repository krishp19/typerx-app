"use client";
import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Statistics() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    averageWpm: 0,
    averageAccuracy: 100,
    totalSessions: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/stats?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching stats:", data.error);
          } else {
            console.log("Fetched stats from server:", data);
            setStats(data);
          }
        })
        .catch((err) => console.error("❌ Fetch error:", err));
    }
  }, [user]);

  return (
    <div>
      <section id="statistics" className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate__animated animate__fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Your Typing Statistics</h2>
            <p className="text-neutral-400">Track your progress and analyze your performance</p>
          </div>

          {!user ? (
            <div className="text-center bg-neutral-800 p-6 rounded-xl border border-neutral-700 animate__animated animate__fadeInUp">
              <h3 className="text-xl font-semibold text-white mb-4">You are not logged in</h3>
              <p className="text-neutral-400 mb-4">Log in to track and save your progress.</p>
              <Link href={"/login"} className="px-4 py-2 bg-green-400 text-black rounded-lg font-bold">Log In</Link>
            </div>
          ) : (
            <>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 animate__animated animate__fadeInUp transform hover:scale-105 hover:shadow-2xl hover:rotate-1 duration-300 ease-in-out">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-neutral-400">Average Speed</div>
                    <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm">+12%</div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{Math.round(stats.averageWpm)} WPM</div>
                  <div className="text-sm text-neutral-500">Last 7 days</div>
                </div>

                <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 animate__animated animate__fadeInUp animate__delay-1s transform hover:scale-105 hover:shadow-2xl hover:rotate-1 duration-300 ease-in-out">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-neutral-400">Accuracy</div>
                    <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm">+5%</div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{Math.round(stats.averageAccuracy)}%</div>
                  <div className="text-sm text-neutral-500">Last 7 days</div>
                </div>

                <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 animate__animated animate__fadeInUp animate__delay-2s transform hover:scale-105 hover:shadow-2xl hover:rotate-1 duration-300 ease-in-out">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-neutral-400">Tests Completed</div>
                    <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm">+25</div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalSessions}</div>
                  <div className="text-sm text-neutral-500">Last 7 days</div>
                </div>

                <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 animate__animated animate__fadeInUp animate__delay-3s transform hover:scale-105 hover:shadow-2xl hover:rotate-1 duration-300 ease-in-out">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-neutral-400">Time Practiced</div>
                    <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm">+2h</div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">8.5h</div>
                  <div className="text-sm text-neutral-500">Last 7 days</div>
                </div>
              </div>

              <div className="bg-neutral-800 rounded-xl p-6 mb-12 animate__animated animate__fadeInUp">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">Speed Progress</h3>
                  <select className="bg-neutral-700 text-green-400 rounded-lg px-4 py-2 border border-neutral-600 focus:outline-none focus:border-green-400">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="h-64 bg-neutral-900 rounded-lg p-4">
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    Interactive chart will be rendered here
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 animate__animated animate__fadeInUp">
                <div className="bg-neutral-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Common Mistakes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg">
                      <span className="text-neutral-400">their vs there</span>
                      <span className="text-green-400">12 times</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg">
                      <span className="text-neutral-400">you're vs your</span>
                      <span className="text-green-400">8 times</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg">
                      <span className="text-neutral-400">its vs it's</span>
                      <span className="text-green-400">6 times</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Achievement Progress</h3>
                  <div className="space-y-4">
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Speed Demon</span>
                        <span className="text-green-400">80%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div className="bg-green-400 rounded-full h-2" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Accuracy Master</span>
                        <span className="text-green-400">65%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div className="bg-green-400 rounded-full h-2" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Marathon Typer</span>
                        <span className="text-green-400">45%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div className="bg-green-400 rounded-full h-2" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Statistics;
