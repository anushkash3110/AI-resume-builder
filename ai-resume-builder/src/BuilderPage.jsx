import { useState } from "react";
import { FaUser, FaEnvelope, FaTools, FaGraduationCap, FaBriefcase, FaCheck } from "react-icons/fa";
import axios from "axios";

export default function BuilderPage({ setScreen }) {

  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: "",
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  <div className="px-6 md:px-16 mb-6">
  <h2 className="text-lg mb-3 text-[#712FDE]">Choose Template</h2>

  <div className="flex gap-4">

    <button
      onClick={() => setSelectedTemplate("classic")}
      className={`px-4 py-2 rounded-lg ${
        selectedTemplate === "classic"
          ? "bg-[#712FDE]"
          : "bg-[#1A1A2E]"
      }`}
    >
      Classic
    </button>

    <button
      onClick={() => setSelectedTemplate("modern")}
      className={`px-4 py-2 rounded-lg ${
        selectedTemplate === "modern"
          ? "bg-[#712FDE]"
          : "bg-[#1A1A2E]"
      }`}
    >
      Modern
    </button>

    <button
      onClick={() => setSelectedTemplate("minimal")}
      className={`px-4 py-2 rounded-lg ${
        selectedTemplate === "minimal"
          ? "bg-[#712FDE]"
          : "bg-[#1A1A2E]"
      }`}
    >
      Minimal
    </button>

  </div>
</div>

  // 🔥 AI FUNCTION
  const generateFromPrompt = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Create a resume from this: ${prompt}. Give short sections for skills, education and experience.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = response.data.choices[0].message.content;

      // Simple parsing (basic for now)
      setFormData({
        name: "AI Generated",
        email: "ai@email.com",
        skills: text.slice(0, 120),
        education: "Generated Education",
        experience: text.slice(120, 300),
      });

    } catch (error) {
      console.error(error);
      alert("Error connecting API");
    }

    setLoading(false);
  };

  // ✅ Track completion
  const isStepComplete = (step) => {
    if (step === 1) return formData.name.trim() !== "";
    if (step === 2) return formData.email.trim() !== "";
    if (step === 3) return formData.skills.trim() !== "";
    if (step === 4) return formData.education.trim() !== "";
    if (step === 5) return formData.experience.trim() !== "";
  };

  const steps = [
    { id: 1, label: "Basic Info", icon: <FaUser /> },
    { id: 2, label: "Contact", icon: <FaEnvelope /> },
    { id: 3, label: "Skills", icon: <FaTools /> },
    { id: 4, label: "Education", icon: <FaGraduationCap /> },
    { id: 5, label: "Experience", icon: <FaBriefcase /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">

      {/* 🔥 AI INPUT */}
      <div className="px-6 md:px-16 mt-6">
        <div className="bg-[#1A1A2E] p-6 rounded-2xl mb-6">

          <h2 className="text-lg mb-3 text-[#712FDE] group">
            Generate with AI <span className="text-sm text-gray-500 group-hover:text-gray-300 transition">
              (Describe yourself to generate a resume)
            </span>
          </h2>

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe yourself..."
            className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700 mb-4"
          />

          <button
            onClick={generateFromPrompt}
            className="bg-[#712FDE] px-6 py-2 rounded-lg hover:bg-[#5a24b8]"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#1A1A2E] shadow-md">
        <h1
          onClick={() => setScreen("home")}
          className="text-xl font-semibold text-[#712FDE] cursor-pointer"
        >
          Resumo
        </h1>

        <button
          onClick={() => setScreen("templates")}
          className="hover:text-[#712FDE]"
        >
          Templates
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row p-6 md:p-16 gap-10">

        {/* LEFT: STEPS */}
        <div className="md:w-1/3 space-y-4">
          {steps.map((s) => (
            <div
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition
                ${step === s.id ? "bg-[#712FDE]" : "bg-[#1A1A2E]"}`}
            >
              <div>{s.icon}</div>
              <span>{s.label}</span>

              {isStepComplete(s.id) && (
                <FaCheck className="ml-auto text-green-400" />
              )}
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="md:w-2/3 bg-[#1A1A2E] p-8 rounded-2xl">

          <h2 className="text-xl mb-6 text-[#712FDE]">
            Step {step}: {steps[step - 1].label}
          </h2>

          {step === 1 && (
            <input name="name" placeholder="Full Name" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700" />
          )}

          {step === 2 && (
            <input name="email" placeholder="Email" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700" />
          )}

          {step === 3 && (
            <input name="skills" placeholder="Skills" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700" />
          )}

          {step === 4 && (
            <input name="education" placeholder="Education" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700" />
          )}

          {step === 5 && (
            <textarea name="experience" placeholder="Experience" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0F0F1A] border border-gray-700" />
          )}

          {/* Buttons */}
          <div className="mt-6 flex justify-between">

            {step > 1 && (
              <button onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-700 rounded-lg">
                Back
              </button>
            )}

            <div className="flex gap-4 ml-auto">

              {step < 5 && (
                <button onClick={() => setStep(step + 1)}
                  className="px-4 py-2 border border-gray-500 rounded-lg">
                  Skip
                </button>
              )}

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepComplete(step)}
                  className={`px-6 py-2 rounded-lg ${
                    isStepComplete(step)
                      ? "bg-[#712FDE]"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button className="px-6 py-2 bg-[#712FDE] rounded-lg hover:bg-[#5a24b8]">
                  Finish
                </button>
              )}

            </div>

          </div>

        </div>

        {/* PREVIEW */}
        <div className="hidden lg:block md:w-1/2 p-8 rounded-2xl">

  {selectedTemplate === "classic" && (
    <div className="bg-white text-black p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold">
        {formData.name || "Your Name"}
      </h1>
      <p>{formData.email || "your@email.com"}</p>

      <h2 className="mt-4 font-semibold">Skills</h2>
      <p>{formData.skills || "..."}</p>

      <h2 className="mt-4 font-semibold">Education</h2>
      <p>{formData.education || "..."}</p>

      <h2 className="mt-4 font-semibold">Experience</h2>
      <p>{formData.experience || "..."}</p>
    </div>
  )}

  {selectedTemplate === "modern" && (
    <div className="bg-white text-black p-6 rounded-xl shadow flex">

      <div className="w-1/3 bg-[#712FDE] text-white p-4 rounded-l-xl">
        <h2 className="text-lg font-bold">{formData.name || "Your Name"}</h2>
        <p className="text-sm">{formData.email}</p>
      </div>

      <div className="w-2/3 p-4">
        <h3 className="font-semibold">Skills</h3>
        <p>{formData.skills}</p>

        <h3 className="mt-3 font-semibold">Education</h3>
        <p>{formData.education}</p>

        <h3 className="mt-3 font-semibold">Experience</h3>
        <p>{formData.experience}</p>
      </div>

    </div>
  )}

  {selectedTemplate === "minimal" && (
    <div className="bg-white text-black p-6 rounded-xl shadow">

      <h1 className="text-xl font-semibold border-b pb-2">
        {formData.name || "Your Name"}
      </h1>

      <p className="text-sm text-gray-600 mb-3">
        {formData.email}
      </p>

      <p><strong>Skills:</strong> {formData.skills}</p>
      <p><strong>Education:</strong> {formData.education}</p>
      <p><strong>Experience:</strong> {formData.experience}</p>

    </div>
  )}

</div>

      </div>

    </div>
  );
}