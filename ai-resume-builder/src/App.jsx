import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center text-white">

      <div className="bg-[#1A1A2E] p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-[#FF4D6D] mb-3">
          AI Resume Builder
        </h1>

        <p className="text-gray-400 mb-6">
          Create a professional resume with AI in minutes
        </p>

        <button className="w-full bg-[#FF4D6D] hover:bg-[#ff3355] transition p-2 rounded-lg">
          Get Started
        </button>

      </div>

    </div>
  );
}