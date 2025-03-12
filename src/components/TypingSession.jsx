'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const TypingSession = ({ sessionId, userId, modeId, onComplete }) => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    mistakes: 0,
    duration: 0
  });
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPracticeText = async () => {
      try {
        // If it's custom mode (modeId === '3'), wait for user input
        if (modeId === '3') {
          setIsCustomMode(true);
          return;
        }

        // Map modeId to the corresponding mode
        const modeMap = {
          '1': 'basic',
          '2': 'advanced',
          '4': 'numbers',
          '5': 'symbols',
          '6': 'code',
          '7': 'quotes'
        };

        const mode = modeMap[modeId] || 'basic';
        const response = await fetch(`/api/practice-texts?mode=${mode}`);
        const data = await response.json();
        
        if (data.success) {
          setText(data.data.text);
        } else {
          toast.error(data.error?.message || 'Failed to load practice text');
        }
      } catch (err) {
        toast.error('Failed to load practice text');
      }
    };

    fetchPracticeText();
  }, [modeId]);

  const handleCustomTextSubmit = async (e) => {
    e.preventDefault();
    if (!customText.trim()) {
      toast.error('Please enter some text to practice with');
      return;
    }

    try {
      const response = await fetch(`/api/practice-texts?mode=custom&customText=${encodeURIComponent(customText)}`);
      const data = await response.json();
      
      if (data.success) {
        setText(data.data.text);
        setIsCustomMode(false);
      } else {
        toast.error(data.error?.message || 'Failed to set custom text');
      }
    } catch (err) {
      toast.error('Failed to set custom text');
    }
  };

  useEffect(() => {
    // Focus the input field when component mounts
    if (!isCustomMode) {
      inputRef.current?.focus();
    }
  }, [isCustomMode]);

  const handleInput = (e) => {
    const input = e.target.value;
  
    if (!startTime) {
      setStartTime(Date.now());
    }
  
    setUserInput(input);
  
    // Calculate mistakes
    let mistakes = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) {
        mistakes++;
      }
    }
  
    // Ensure we don't divide by zero
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = input.length / 5; // Approximate words
  
    // Prevent division by zero (before first second)
    const currentWPM = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const accuracy = input.length > 0 ? Math.round(((input.length - mistakes) / input.length) * 100) : 100;
  
    setStats({
      wpm: currentWPM || 0,
      accuracy,
      mistakes,
      duration: Math.round(timeElapsed * 60) // Convert minutes to seconds
    });
  
    // Check if typing is complete
    if (input.length === text.length) {
      handleCompletion(currentWPM, accuracy, mistakes, Math.round(timeElapsed * 60));
    }
  };
  

  const handleCompletion = async (wpm, accuracy, mistakes, duration) => {
    if (isFinished) return;
    setIsFinished(true);

    try {
      const response = await fetch('/api/practice-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          userId,
          wpm,
          accuracy,
          mistakes,
          duration
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Practice session completed!');
        onComplete?.(data.data);
      } else {
        toast.error(data.error?.message || 'Failed to save results');
      }
    } catch (err) {
      toast.error('Failed to save results');
    }
  };

  if (isCustomMode) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Custom Practice Mode</h3>
        <form onSubmit={handleCustomTextSubmit} className="space-y-4">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full h-32 bg-neutral-800 text-green-400 rounded-xl p-4 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your custom text here..."
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
          >
            Start Practice
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['WPM', 'Accuracy', 'Mistakes', 'Time'].map((label, index) => (
          <div key={index} className="p-4 rounded-xl bg-neutral-900 text-green-400 text-center shadow-md">
            <span className="block font-bold text-lg">{label}</span>
            <span className="text-xl">
              {label === 'WPM' && stats.wpm}
              {label === 'Accuracy' && `${stats.accuracy}%`}
              {label === 'Mistakes' && stats.mistakes}
              {label === 'Time' && `${stats.duration}s`}
            </span>
          </div>
        ))}
      </div>

      {/* Typing Text */}
      <div className="relative bg-neutral-900 rounded-xl p-6 mb-6 leading-loose text-lg font-mono text-neutral-400">
        {text.split('').map((char, index) => {
          let className = 'text-neutral-400';
          if (index < userInput.length) {
            className = userInput[index] === char ? 'text-green-400' : 'bg-red-500 text-white rounded-md px-1';
          }
          return <span key={index} className={`${className} transition-colors duration-200`}>{char}</span>;
        })}
        {!isFinished && userInput.length < text.length && (
          <span className="animate-blink text-green-400">|</span>
        )}
      </div>

      {/* Typing Input */}
      <div className="relative">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          disabled={isFinished}
          className="w-full h-32 bg-neutral-800 text-green-400 rounded-xl p-4 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Start typing..."
        />
        {isFinished && (
          <div className="absolute inset-0 bg-neutral-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Practice Complete!</h3>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSession;
