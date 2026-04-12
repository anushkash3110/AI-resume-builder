import { useState } from "react";
import { FaUser, FaEnvelope, FaTools, FaGraduationCap, FaCheck } from "react-icons/fa";

export default function BuilderPage({ setScreen }) {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
  });

  const [showResume, setShowResume] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Step validation
  const isStepComplete = (step) => {
    if (step === 1) return formData.name !== "";
    if (step === 2) return formData.email !== "";
    if (step === 3) return formData.skills !== "";
    if (step === 4) return formData.education !== "";
  };

  const steps = [
    { id: 1, label: "Basic Info", icon: <FaUser /> },
    { id: 2, label: "Contact", icon: <FaEnvelope /> },
    { id: 3, label: "Skills", icon: <FaTools /> },
    { id: 4, label: "Education", icon: <FaGraduationCap /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#1A1A2E] shadow-md">
        <h1
          onClick={() => setScreen("home")}
          className="text-xl font-semibold text-[#712FDE] cursor-pointer"
        >
          Resumo
        </h1>

        <button
          onClick={() => setScreen("home")}
          className="hover:text-[#712FDE]"
        >
          Home
        </button>
      </div>

      {!showResume ? (
        <div className="flex flex-col md:flex-row p-6 md:p-16 gap-10">

          {/* LEFT: Steps */}
          <div className="md:w-1/3 space-y-6">

            {steps.map((s) => (
              <div
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition 
                  ${step === s.id ? "bg-[#712FDE]" : "bg-[#1A1A2E]"}`}
              >
                <div className="text-lg">{s.icon}</div>

                <span>{s.label}</span>

                {/* Tick */}
                {isStepComplete(s.id) && (
                  <FaCheck className="ml-auto text-green-400" />
                )}
              </div>
            ))}

          </div>

          {/* RIGHT: Form */}
          <div className="md:w-2/3 bg-[#1A1A2E] p-8 rounded-2xl">

            <h2 className="text-xl mb-6 text-[#712FDE]">
              Step {step}
            </h2>

            {step === 1 && (
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700"
              />
            )}

            {step === 2 && (
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700"
              />
            )}

            {step === 3 && (
              <input
                type="text"
                name="skills"
                placeholder="Enter skills"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700"
              />
            )}

            {step === 4 && (
              <input
                type="text"
                name="education"
                placeholder="Enter education"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700"
              />
            )}

            {/* Next Button */}
            <div className="mt-6 flex justify-between">

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-700 rounded-lg"
                >
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-6 py-2 bg-[#712FDE] rounded-lg"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => setShowResume(true)}
                  className="ml-auto px-6 py-2 bg-[#712FDE] rounded-lg hover:bg-[#5a24b8]"
                >
                  Generate Resume
                </button>
              )}

            </div>

          </div>

        </div>
      ) : (

        /* Resume Output */
        <div className="max-w-3xl mx-auto mt-10 bg-white text-black p-8 rounded-xl">

          <h1 className="text-2xl font-bold">{formData.name}</h1>
          <p>{formData.email}</p>

          <h2 className="mt-4 font-semibold">Skills</h2>
          <p>{formData.skills}</p>

          <h2 className="mt-4 font-semibold">Education</h2>
          <p>{formData.education}</p>

        </div>

      )}

      {/* ABOUT SECTION */}
      <div className="mt-20 px-6 md:px-16 py-10 text-gray-400 bg-black">
        <h3 className="text-[#712FDE] mb-3">About</h3>
        <p>Resumo helps build resumes using AI.</p>
        <p>Bhopal, India</p>
        <p>support@resumo.com</p>
      </div>

    </div>
  );
}