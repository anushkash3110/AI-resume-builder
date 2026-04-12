import { useState } from "react";

export default function TemplateSelector({ type, setScreen }) {

  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Scroll function
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Title
  const getTitle = () => {
    if (type === "resume") return "Resume Templates";
    if (type === "cover") return "Cover Letter Templates";
    if (type === "website") return "Website Templates";
  };

  // Templates Data
  const templates = {
    resume: [
      { name: "Classic", img: "/resume.png", paid: false },
      { name: "Modern", img: "/resume.png", paid: false },
      { name: "Minimal", img: "/resume.png", paid: false },
      { name: "Executive", img: "/resume.png", paid: true },
      { name: "Premium Pro", img: "/resume.png", paid: true },
      { name: "Designer CV", img: "/resume.png", paid: true },
    ],
    cover: [
      { name: "Professional", img: "/cover.png", paid: false },
      { name: "Creative", img: "/cover.png", paid: false },
      { name: "Simple", img: "/cover.png", paid: false },
      { name: "Corporate Elite", img: "/cover.png", paid: true },
      { name: "Premium Letter", img: "/cover.png", paid: true },
      { name: "Startup Style", img: "/cover.png", paid: true },
    ],
    website: [
      { name: "Portfolio", img: "/website.png", paid: false },
      { name: "Developer", img: "/website.png", paid: false },
      { name: "Minimal Site", img: "/website.png", paid: false },
      { name: "Premium Portfolio", img: "/website.png", paid: true },
      { name: "Creative Web", img: "/website.png", paid: true },
      { name: "Pro Developer", img: "/website.png", paid: true },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#1A1A2E] shadow-md sticky top-0 z-50">

        <h1
          onClick={() => setScreen("home")}
          className="text-lg md:text-xl font-semibold text-[#712FDE] cursor-pointer"
        >
          Resumo
        </h1>

        <div className="flex items-center gap-6 md:gap-10 text-sm md:text-base font-medium">

          <button
            onClick={() => setScreen("home")}
            className="hover:text-[#712FDE] transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-[#712FDE] transition"
          >
            About
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="px-6 md:px-16 py-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-[#712FDE]">
          {getTitle()}
        </h1>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {templates[type]?.map((template, index) => (
            <div
              key={index}
              className="bg-[#1A1A2E] p-4 rounded-2xl hover:shadow-[0_0_25px_#712FDE] transition duration-300 cursor-pointer group relative"
            >

              {/* Paid Badge */}
              {template.paid && (
                <span className="absolute top-3 right-3 bg-[#712FDE] text-xs px-2 py-1 rounded-md">
                  PRO
                </span>
              )}

              <img
                src={template.img}
                className="rounded-lg mb-3 w-full h-[200px] object-cover group-hover:scale-105 transition"
              />

              <h3 className="text-lg font-medium mb-3">
                {template.name}
              </h3>

              <button
                onClick={() => {
                  if (template.paid) {
                    setShowPremiumModal(true);
                  } else {
                    setScreen("builder");
                  }
                }}
                className="w-full py-2 rounded-lg bg-[#712FDE] hover:bg-[#5a24b8] transition shadow-md hover:shadow-[0_0_15px_#712FDE]"
              >
                {template.paid ? "Unlock Premium" : "Use Template"}
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* ✅ PREMIUM MODAL (OUTSIDE MAP) */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#1A1A2E] p-8 rounded-2xl w-[90%] max-w-md shadow-lg">

            <h2 className="text-xl font-semibold mb-4 text-[#712FDE]">
              Unlock Premium Template
            </h2>

            <p className="text-gray-400 mb-6">
              Get access to premium templates by signing in and making a one-time payment of ₹200.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 rounded-lg bg-[#0F0F1A] border border-gray-700"
            />

            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 mb-6 rounded-lg bg-[#0F0F1A] border border-gray-700"
            />

            <div className="flex gap-4">

              <button
                onClick={() => {
                  alert("Payment Successful");
                  setShowPremiumModal(false);
                  setScreen("builder");
                }}
                className="flex-1 bg-[#712FDE] py-2 rounded-lg hover:bg-[#5a24b8]"
              >
                Pay ₹200
              </button>

              <button
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 border border-gray-500 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* About Section */}
      <div id="about" className="px-6 md:px-16 py-16 text-gray-400 bg-black">

        <h2 className="text-2xl text-[#712FDE] mb-4">
          About Resumo
        </h2>

        <p className="mb-3">
          Resumo helps users build professional resumes, cover letters, and personal websites using AI.
        </p>

        <p>Bhopal, India</p>
        <p>support@resumo.com</p>

        <p className="mt-4 text-sm">
          © 2026 Resumo. All rights reserved.
        </p>

      </div>

    </div>
  );
}