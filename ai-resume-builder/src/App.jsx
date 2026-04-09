import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'


function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0F0F1A]  h-20 p-5 rounded-xl border border-gray-700">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-medium">{question}</h3>
        <span>{open ? "-" : "+"}</span>
      </div>

      {open && (
        <p className="text-gray-400 mt-3 text-sm">
          {answer}
        </p>
      )}
    </div>
  );
}

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
        <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">

    {/* Navbar */}
    <div className="flex justify-between items-center px-10 py-4 bg-[#1A1A2E] shadow-md mb-14">
      <h1 className="text-xl font-semibold text-[#712FDE]">Resumo</h1>

      <div className="flex items-center gap-10 text-sm font-medium">
        <button className="hover:text-[#712FDE] transition duration-200">Home</button>
        <button className="hover:text-[#712FDE] transition duration-200">About</button>
        <button className="hover:text-[#712FDE] transition duration-200">FAQs</button>
      </div>

      <div className="flex gap-4">
        <button className="border border-[#712FDE] px-4 py-2 rounded-lg hover:bg-[#712FDE] transition">
          Login
        </button>
        <button className="bg-[#712FDE] px-4 py-2 rounded-lg">
          Sign Up
        </button>
      </div>
    </div>

    {/* HERO SECTION */}
    <div className="flex items-center justify-between px-16 py-16 gap-20">

      {/* LEFT IMAGE */}
      <img
        src="/resume.png"  // YOU will add your image in public folder
        alt="resume"
        className="w-[500px] rounded-xl"
      />

      {/* RIGHT TEXT */}
      <div className="max-w-xl">

        <h1 className="text-6xl font-bold mb-12">
          Welcome to <span className="text-[#712FDE]">Resumo</span>
        </h1>

        <p className="text-2xl text-white-400 font-light mb-6">
          Don't hustle or worry for creating resume any more.
        </p>

        <p className="text-gray-400 mb-6">
          Build resume or cover letter for job interviews in one go with AI Resume Builder
        </p>

        <button
          onClick={() => {
            document.getElementById("options").scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-[#712FDE] px-6 py-3 rounded-lg hover:bg-[#5a24b8] transition"
        >
          Start Building
        </button>

      </div>
    </div>

    {/* OPTIONS SECTION */}
    <div id="options" className="px-16 py-24 bg-black mt-10">

  {/* Title */}
  <h2 className="text-3xl text-center mb-12 font-semibold text-[#712FDE]">
    What do you want to create?
  </h2>

  {/* Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Resume */}
    <div className="text-center group">
      <img
        src="/resume.png"
        alt="resume"
        className="w-full h-[220px] object-cover rounded-xl mb-4 transition group-hover:shadow-[0_0_20px_#DEC749]"
      />

      <button className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition">
        Resume
      </button>
    </div>

    {/* Cover Letter */}
    <div className="text-center group">
      <img
        src="/cover.png"
        alt="cover letter"
        className="w-full h-[220px] object-cover rounded-xl mb-4 transition group-hover:shadow-[0_0_20px_#DEC749]"
      />

      <button className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition">
        Cover Letter
      </button>
    </div>

    {/* Website */}
    <div className="text-center group">
      <img
        src="/website.png"
        alt="website"
        className="w-full h-[220px] object-cover rounded-xl mb-4 transition group-hover:shadow-[0_0_20px_#DEC749]"
      />

      <button className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition">
        Resume Website
      </button>
    </div>

  </div>

</div>

    {/* FAQ SECTION */}
    <div className="px-16 py-20 bg-[#black]">

  <h2 className="text-2xl mb-8 text-[#712FDE]">FAQs</h2>

  <div className="space-y-4">

    <FAQItem
      question="Is this resume builder free?"
      answer="Yes, ResumeAI provides free access to basic resume building tools. You can create, edit, and download resumes easily. Advanced AI features may be added later."
    />

    <FAQItem
      question="Are the resumes ATS-friendly?"
      answer="Yes, all templates are designed to pass Applicant Tracking Systems (ATS). This increases your chances of getting shortlisted by companies."
    />

    <FAQItem
      question="Can I edit my resume later?"
      answer="Absolutely. You can come back anytime, update your details, and regenerate your resume with improved AI suggestions."
    />

    <FAQItem
      question="What makes ResumeAI different?"
      answer="ResumeAI focuses on simplicity and intelligence. Instead of filling long forms, you describe your profile and AI helps generate a professional resume instantly."
    />

  </div>

</div>

    {/* ABOUT / FOOTER */}
    <div className="px-16 py-10 text-sm bg-black text-gray-400">

      <h3 className="text-[#712FDE] mb-3">About</h3>

      <p>
        Resumo helps users build professional resumes, cover letters, and resume websites using AI technology.
      </p>

      <p className="mt-3">
        Office: Bhopal, India  
      </p>

      <p>
        Email: support@resumo.com  
      </p>

      <p className="mt-4">
        © 2026 Resumo. All rights reserved.
      </p>

    </div>

  </div>
)}
    </div>
  );
}