"use client"

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="p-8 bg-gray-900 shadow-lg rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center text-green-400">Login</h2>

        <form onSubmit={handleLogin} className="mt-6">
          <div className="flex items-center bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">👤</span>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border-none text-white ml-3 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-gray-800 p-3 rounded-lg mt-4">
            <span className="text-green-400">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent border-none text-white ml-3 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between mt-4 text-gray-400 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-400" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="hover:text-green-400">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
