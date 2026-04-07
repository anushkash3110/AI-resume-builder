import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'


export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex items-center justify-center">

      {screen === "home" && (
        <div className="bg-[#1A1A2E] p-10 rounded-2xl shadow-xl w-[400px] text-center">
          
          <h1 className="text-3xl font-bold text-[#712FDE] mb-3">
            AI Resume Builder
          </h1>

          <p className="text-gray-400 mb-6">
            Create a professional resume with AI in minutes
          </p>

          <button
            onClick={() => setScreen("template")}
            className="w-full bg-[#712FDE] hover:bg-[#5a24b8] transition p-2 rounded-lg"
          >
            Get Started
          </button>
        </div>
      )}

      {screen === "template" && (
  <div className="min-h-screen bg-[#0F0F1A] text-white">

    {/* Navbar */}
    <div className="flex justify-between items-center px-8 py-4 bg-[#1A1A2E] shadow-md">
      <h1 className="text-xl font-semibold text-[#712FDE]">ResumeAI</h1>

      <div className="flex gap-6 text-sm">
        <button className="hover:text-[#712FDE]">Home</button>
        <button className="hover:text-[#712FDE]">About</button>
        <button className="hover:text-[#712FDE]">Create</button>
      </div>

      <button className="bg-[#712FDE] px-4 py-1 rounded-lg">
        Profile
      </button>
    </div>

    {/* Main Content */}
    <div className="p-8 max-w-5xl mx-auto">

      {/* AI Input Section */}
      <div className="bg-[#1A1A2E] p-6 rounded-2xl mb-8">
        <h2 className="text-lg mb-3 font-medium">
          Describe your resume
        </h2>

        <input
          type="text"
          placeholder="e.g. I am a CS student skilled in Java, React..."
          className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700 outline-none"
        />
      </div>

      {/* Templates */}
      <h2 className="text-xl mb-4 text-[#712FDE] font-semibold">
        Choose Template
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-[#1A1A2E] p-4 rounded-2xl hover:shadow-[0_0_15px_#712FDE] transition cursor-pointer">
          <img
            src="https://via.placeholder.com/300x200"
            alt="template"
            className="rounded-lg mb-3"
          />
          <h3>ATS Friendly</h3>
        </div>

        <div className="bg-[#1A1A2E] p-4 rounded-2xl hover:shadow-[0_0_15px_#712FDE] transition cursor-pointer">
          <img
            src="https://via.placeholder.com/300x200"
            alt="template"
            className="rounded-lg mb-3"
          />
          <h3>Modern</h3>
        </div>

        <div className="bg-[#1A1A2E] p-4 rounded-2xl hover:shadow-[0_0_15px_#712FDE] transition cursor-pointer">
          <img
            src="https://via.placeholder.com/300x200"
            alt="template"
            className="rounded-lg mb-3"
          />
          <h3>Minimal</h3>
        </div>

        <div className="bg-[#1A1A2E] p-4 rounded-2xl hover:shadow-[0_0_15px_#712FDE] transition cursor-pointer">
          <img
            src="https://via.placeholder.com/300x200"
            alt="template"
            className="rounded-lg mb-3"
          />
          <h3>Student</h3>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}