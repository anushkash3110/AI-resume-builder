import { useState } from "react";
import axios from "axios";

export default function BuilderPage({ selectedTemplate }) {

  const [step, setStep] = useState(1);
  const [showResume, setShowResume] = useState(false);
  const [prompt, setPrompt] = useState("");

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

  const generateFromPrompt = async () => {
    if (!prompt) return;

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Create resume from: ${prompt}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      const text = res.data.choices[0].message.content;

      setFormData({
        name: "AI Generated",
        email: "ai@email.com",
        skills: text.slice(0, 100),
        education: "Generated",
        experience: text.slice(100, 200),
      });

    } catch (err) {
      console.error(err);
    }
  };

  // FINAL RESUME SCREEN
  if (showResume) {
    return (
      <div className="min-h-screen bg-white text-black p-10">

        <h1 className="text-3xl font-bold">{formData.name}</h1>
        <p>{formData.email}</p>

        <h2 className="mt-4">Skills</h2>
        <p>{formData.skills}</p>

        <h2 className="mt-4">Education</h2>
        <p>{formData.education}</p>

        <h2 className="mt-4">Experience</h2>
        <p>{formData.experience}</p>

        <button
          onClick={() => window.print()}
          className="mt-6 bg-[#712FDE] px-4 py-2 text-white rounded"
        >
          Print
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-6">

      {/* AI */}
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 bg-[#1A1A2E] mb-4"
      />

      <button
        onClick={generateFromPrompt}
        className="bg-[#712FDE] px-4 py-2 mb-6"
      >
        Generate
      </button>

      {/* FORM */}
      {step === 1 && <input name="name" onChange={handleChange} />}
      {step === 2 && <input name="email" onChange={handleChange} />}
      {step === 3 && <input name="skills" onChange={handleChange} />}
      {step === 4 && <input name="education" onChange={handleChange} />}
      {step === 5 && <textarea name="experience" onChange={handleChange} />}

      <button
        onClick={() => {
          if (step < 5) setStep(step + 1);
          else setShowResume(true);
        }}
        className="mt-4 bg-[#712FDE] px-4 py-2"
      >
        {step < 5 ? "Next" : "Generate Resume"}
      </button>

    </div>
  );
}