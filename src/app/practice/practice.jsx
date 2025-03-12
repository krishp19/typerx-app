'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import TypingSession from '../../components/TypingSession';
import { IoExitOutline } from 'react-icons/io5';  // Exit icon


function Practice() {
  const { userId } = useAuth();
  const [practiceTypes, setPracticeTypes] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState({
    modes: true,
    progress: true
  });
  const [error, setError] = useState({
    modes: null,
    progress: null
  });

  // Fetch practice modes
  useEffect(() => {
    const fetchPracticeModes = async () => {
      try {
        const response = await fetch('/api/practice-modes');
        const data = await response.json();
        
        if (data.success) {
          setPracticeTypes(data.data);
        } else {
          setError(prev => ({ ...prev, modes: data.error?.message || 'Failed to load practice modes' }));
        }
      } catch (err) {
        setError(prev => ({ ...prev, modes: 'Failed to load practice modes' }));
      } finally {
        setLoading(prev => ({ ...prev, modes: false }));
      }
    };

    fetchPracticeModes();
  }, []);

  // Fetch user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/users/${userId}/stats`);
        const data = await response.json();
        
        if (data.success) {
          setUserProgress(data.data);
        } else {
          setError(prev => ({ ...prev, progress: data.error?.message || 'Failed to load progress' }));
        }
      } catch (err) {
        setError(prev => ({ ...prev, progress: 'Failed to load progress' }));
      } finally {
        setLoading(prev => ({ ...prev, progress: false }));
      }
    };

    fetchUserProgress();
  }, [userId]);

  // Start practice session
  const handleStartPractice = async (modeId) => {
    if (!userId) {
      toast.error('Please sign in to start practicing');
      return;
    }

    try {
      const response = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          modeId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setActiveSession({
          ...data.data,
          modeId
        });
        toast.success('Practice session started!');
      } else {
        toast.error(data.error?.message || 'Failed to start practice session');
      }
    } catch (err) {
      toast.error('Failed to start practice session');
    }
  };

  // Handle session completion
  const handleSessionComplete = async (results) => {
    // Refresh user progress
    const response = await fetch(`/api/users/${userId}/progress`);
    const data = await response.json();
    if (data.success) {
      setUserProgress(data.data);
    }
    setActiveSession(null);
  };

  // Render progress stats
  const renderProgressStats = () => {
    if (!userProgress?.overallStats) return null;

    const stats = [
      { label: 'Total Sessions', value: userProgress.overallStats.totalSessions },
      { label: 'Average WPM', value: Math.round(userProgress.overallStats.averageWpm) },
      { label: 'Best WPM', value: userProgress.overallStats.bestWpm },
      { label: 'Average Accuracy', value: `${userProgress.overallStats.averageAccuracy}%` },
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-neutral-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h4 className="text-neutral-400 text-sm font-medium mb-2">{stat.label}</h4>
            <p className="text-green-400 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };

  // Render recent results
  const renderRecentResults = () => {
    if (!userProgress?.recentResults?.length) return null;

    return (
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Results
        </h4>
        <div className="space-y-4">
          {userProgress.recentResults.map((result) => (
            <div 
              key={result.id} 
              className="bg-neutral-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="text-green-400 text-2xl font-bold">{result.wpm}</span>
                  <span className="text-neutral-400 text-sm ml-1">WPM</span>
                </div>
                <span className="text-neutral-400 text-sm">
                  {new Date(result.completedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400 capitalize">{result.type}</span>
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-neutral-400">ACC</span>
                    <span className="text-white ml-2">{result.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Time</span>
                    <span className="text-white ml-2">{result.duration}s</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (activeSession) {
    return (
      <div className="bg-neutral-800 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-green-400">Practice Session</h2>
            {/* <button
              onClick={() => setActiveSession(null)}
              className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors duration-200"
            >
              Exit Session
            </button> */}
            <button onClick={() => setActiveSession(null)}
            className="px-4 py-2 bg-neutral-800 text-red-400 rounded-lg 
                      flex items-center justify-center gap-2
                      hover:bg-neutral-700 hover:text-red-300 
                      focus:outline-none focus:ring-2 focus:ring-red-500/50
                      active:bg-neutral-900 
                      shadow-md hover:shadow-lg 
                      transition-all duration-200 ease-in-out
                      font-medium">
            <IoExitOutline size={28} />
            <span>Exit</span>
          </button>
          </div>
          <TypingSession
            sessionId={activeSession.id}
            userId={userId}
            modeId={activeSession.modeId}
            onComplete={handleSessionComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <>
    <section id="practice" className="bg-neutral-800 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">Practice Zone</h2>
          <p className="text-neutral-400 text-lg">Improve your typing skills with customized practice sessions</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Practice Section - Full width */}
          <div className="lg:col-span-12 space-y-8">
            {error.modes && (
              <div className="text-red-400 text-center mb-8 p-4 bg-red-400/10 rounded-xl border border-red-400/20">
                {error.modes}
              </div>
            )}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading.modes ? (
                // Loading skeleton for practice modes
                [...Array(3)].map((_, index) => (
                  <div key={index} className="bg-neutral-900 rounded-xl p-6 border border-neutral-700 animate-pulse">
                    <div className="h-12 w-12 bg-neutral-800 rounded-lg mb-4"></div>
                    <div className="h-6 bg-neutral-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-800 rounded w-full mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                      <div className="h-8 bg-neutral-800 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              ) : (
                practiceTypes.map((mode) => (
                  <div key={mode.id} 
                    className="group relative p-6 bg-neutral-800 rounded-xl
                             hover:bg-neutral-700 
                             transform hover:scale-105 hover:shadow-xl
                             transition-all duration-300 ease-in-out
                             flex flex-col min-h-[280px]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-xl"></div>
                    <div className="p-3 bg-green-500/10 rounded-full w-12 h-12 mb-4 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="text-xl font-bold text-green-500 mb-2">{mode.name}</div>
                    <div className="text-neutral-400 text-sm mb-4 flex-grow">{mode.description}</div>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-sm font-medium">{mode.difficulty}</span>
                        <button 
                          onClick={() => handleStartPractice(mode.id)}
                          className="px-6 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium 
                                   hover:bg-green-400 active:bg-green-600
                                   transition-all duration-200"
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Specialized Practice Section */}
        <div className="mt-12 bg-neutral-900 rounded-xl p-8 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-bold text-white mb-8">Specialized Practice</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <button 
              onClick={() => handleStartPractice('4')}
              className="group relative p-6 bg-neutral-800 rounded-xl hover:bg-neutral-700 
                       transform hover:scale-105 hover:shadow-xl
                       transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-500 mb-2">Numbers</div>
                  <div className="text-neutral-400 text-sm">Master numeric typing with dedicated number practice sessions</div>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleStartPractice('5')}
              className="group relative p-6 bg-neutral-800 rounded-xl hover:bg-neutral-700 
                       transform hover:scale-105 hover:shadow-xl
                       transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 rounded-t-xl"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-500 mb-2">Symbols</div>
                  <div className="text-neutral-400 text-sm">Perfect your special character typing skills</div>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleStartPractice('6')}
              className="group relative p-6 bg-neutral-800 rounded-xl hover:bg-neutral-700 
                       transform hover:scale-105 hover:shadow-xl
                       transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-xl"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-500 mb-2">Code</div>
                  <div className="text-neutral-400 text-sm">Practice typing code snippets and syntax</div>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleStartPractice('7')}
              className="group relative p-6 bg-neutral-800 rounded-xl hover:bg-neutral-700 
                       transform hover:scale-105 hover:shadow-xl
                       transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 rounded-t-xl"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-500 mb-2">Quotes</div>
                  <div className="text-neutral-400 text-sm">Type famous quotes and passages</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Practice Type Statistics Section */}
        <div className="mt-12 bg-neutral-900 rounded-xl p-8 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Practice Statistics
          </h3>
              
          {error.progress && (
            <div className="text-red-400 text-center mb-6 p-4 bg-red-400/10 rounded-lg border border-red-400/20">
              {error.progress}
            </div>
          )}
              
          {loading.progress ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-neutral-800 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-neutral-700 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-neutral-700 rounded w-3/4"></div>
                    <div className="h-5 bg-neutral-700 rounded w-2/3"></div>
                    <div className="h-5 bg-neutral-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProgress?.practiceTypeStats && Object.entries(userProgress.practiceTypeStats).map(([type, stats]) => (
                <div key={type} className="bg-neutral-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  <h4 className="text-xl font-semibold text-white mb-4 capitalize">{type}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Sessions</span>
                      <span className="text-green-400 font-medium">{stats.totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Avg WPM</span>
                      <span className="text-green-400 font-medium">{Math.round(stats.averageWpm)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Best WPM</span>
                      <span className="text-green-400 font-medium">{stats.bestWpm}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Accuracy</span>
                      <span className="text-green-400 font-medium">{stats.averageAccuracy}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

export default Practice
