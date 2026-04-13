import FAQItem from "./FAQItem";

export default function LandingPage({ setScreen, setType }) {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-[#1A1A2E] shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-semibold text-[#712FDE]">Resumo</h1>

        <div className="flex items-center gap-10 text-sm font-medium">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-[#712FDE] transition duration-200"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-[#712FDE] transition duration-200"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="hover:text-[#712FDE] transition duration-200"
          >
            FAQs
          </button>
        </div>

        <div className="flex gap-4">
          <button className="border border-[#712FDE] px-4 py-2 rounded-lg hover:bg-[#712FDE] transition">
            Login
          </button>
          <button className="bg-[#712FDE] px-4 py-2 rounded-lg hover:bg-[#5a24b8] transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div id="home" className="flex items-center justify-between px-16 py-20 gap-20">

        {/* LEFT IMAGE */}
        <img
          src="/resume.png"
          alt="resume preview"
          className="w-[460px] rounded-xl shadow-[0_0_40px_#712FDE55]"
        />

        {/* RIGHT TEXT */}
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Welcome to{" "}
            <span className="text-[#712FDE]">Resumo</span>
          </h1>

          <p className="text-2xl text-white font-light mb-4">
            Don't hustle or worry about creating a resume anymore.
          </p>

          <p className="text-gray-400 mb-8 text-lg">
            Build a resume or cover letter for job interviews in one go with our AI Resume Builder.
          </p>

          <button
            onClick={() => scrollToSection("options")}
            className="bg-[#712FDE] px-8 py-3 rounded-lg hover:bg-[#5a24b8] transition text-lg font-medium"
          >
            Start Building
          </button>
        </div>
      </div>

      {/* OPTIONS SECTION */}
      <div id="options" className="px-16 py-24 bg-black mt-10">
        <h2 className="text-3xl text-center mb-12 font-semibold text-[#712FDE]">
          What do you want to create?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Resume */}
          <div className="text-center group">
            <img
              src="/resume.png"
              alt="resume"
              className="w-full h-[220px] object-cover rounded-xl mb-4 transition group-hover:shadow-[0_0_20px_#DEC749]"
            />
            <button
              onClick={() => {
                setType("resume");
                setScreen("templates");
              }}
              className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition font-medium"
            >
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
            <button
              onClick={() => {
                setType("cover");
                setScreen("templates");
              }}
              className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition font-medium"
            >
              Cover Letter
            </button>
          </div>

          {/* Website */}
          <div className="text-center group">
            <img
              src="/website.png"
              alt="resume website"
              className="w-full h-[220px] object-cover rounded-xl mb-4 transition group-hover:shadow-[0_0_20px_#DEC749]"
            />
            <button
              onClick={() => {
                setType("website");
                setScreen("templates");
              }}
              className="mt-2 px-6 py-2 border border-[#DEC749] rounded-lg hover:bg-[#DEC749] hover:text-black transition font-medium"
            >
              Resume Website
            </button>
          </div>

        </div>
      </div>

      {/* FAQ SECTION */}
      <div id="faq" className="px-16 py-20 bg-[#0F0F1A]">
        <h2 className="text-2xl mb-8 font-semibold text-[#712FDE]">FAQs</h2>

        <div className="space-y-4">
          <FAQItem
            question="Is this resume builder free?"
            answer="Yes, Resumo provides free access to all resume building tools. You can create, edit, and download resumes easily with full AI assistance."
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
            question="What makes Resumo different?"
            answer="Resumo focuses on simplicity and intelligence. Instead of filling long forms, you describe your profile and AI helps generate a professional resume instantly."
          />
        </div>
      </div>

      {/* ABOUT / FOOTER */}
      <div id="about" className="px-16 py-10 text-sm bg-black text-gray-400 border-t border-gray-800">
        <h3 className="text-[#712FDE] mb-3 text-base font-semibold">About</h3>
        <p>
          Resumo helps users build professional resumes, cover letters, and resume websites using AI technology.
        </p>
        <p className="mt-3">Office: Bhopal, India</p>
        <p>Email: support@resumo.com</p>
        <p className="mt-4">© 2026 Resumo. All rights reserved.</p>
      </div>

    </div>
  );
}