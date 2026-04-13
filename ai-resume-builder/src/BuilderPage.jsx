import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaCheck,
} from "react-icons/fa";

export default function BuilderPage({ selectedTemplate }) {

  const [step, setStep] = useState(1);
  const [showResume, setShowResume] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // AI
  const generateFromPrompt = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Create resume data from: ${prompt}`,
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

      const text = res.data.choices[0].message.content;

      setFormData({
        name: "AI Generated",
        email: "ai@email.com",
        skills: text.slice(0, 100),
        education: "Generated Education",
        experience: text.slice(100, 250),
      });

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

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

  // FINAL SCREEN
  if (showResume) {
    return (
      <div className="min-h-screen bg-white text-black p-10">

        <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
        <p>{formData.email}</p>

        <h2 className="mt-4 font-semibold">Skills</h2>
        <p>{formData.skills}</p>

        <h2 className="mt-4 font-semibold">Education</h2>
        <p>{formData.education}</p>

        <h2 className="mt-4 font-semibold">Experience</h2>
        <p>{formData.experience}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => window.print()}
            className="bg-[#712FDE] px-4 py-2 rounded text-white"
          >
            Print
          </button>

          <button
            onClick={() => alert("Download coming next")}
            className="border px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-6">

      {/* AI */}
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe yourself..."
        className="w-full p-3 bg-[#1A1A2E] rounded mb-3"
      />

      <button
        onClick={generateFromPrompt}
        className="bg-[#712FDE] px-4 py-2 rounded mb-6"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="flex gap-10">

        {/* Steps */}
        <div className="w-1/3">
          {steps.map((s) => (
            <div
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`p-3 mb-2 cursor-pointer ${
                step === s.id ? "bg-[#712FDE]" : "bg-[#1A1A2E]"
              }`}
            >
              {s.label}
              {isStepComplete(s.id) && <FaCheck />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="w-2/3">

          {step === 1 && <input name="name" onChange={handleChange} />}
          {step === 2 && <input name="email" onChange={handleChange} />}
          {step === 3 && <input name="skills" onChange={handleChange} />}
          {step === 4 && <input name="education" onChange={handleChange} />}
          {step === 5 && <textarea name="experience" onChange={handleChange} />}

          <div className="mt-6">

            {step < 5 ? (
              <button
                disabled={!isStepComplete(step)}
                onClick={() => setStep(step + 1)}
                className="bg-[#712FDE] px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setShowResume(true)}
                className="bg-[#712FDE] px-4 py-2 rounded"
              >
                Generate Resume
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}