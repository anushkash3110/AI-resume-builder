import { useState } from "react";

export default function BuilderPage({ selectedTemplate, type, setScreen }) {

  const [step, setStep] = useState(1);
  const [showResume, setShowResume] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    summary: "",
  });

  const totalSteps = 7;

  const steps = [
    { field: "name",       label: "Full Name",           placeholder: "e.g. Rahul Sharma",              type: "input"    },
    { field: "email",      label: "Email Address",        placeholder: "e.g. rahul@email.com",           type: "input"    },
    { field: "phone",      label: "Phone Number",         placeholder: "e.g. +91 9876543210",            type: "input"    },
    { field: "skills",     label: "Skills",               placeholder: "e.g. React, Node.js, Python...", type: "textarea" },
    { field: "education",  label: "Education",            placeholder: "e.g. B.Tech CSE, RGPV 2024",    type: "textarea" },
    { field: "experience", label: "Work Experience",      placeholder: "e.g. Software Intern at TCS...", type: "textarea" },
    { field: "summary",    label: "Professional Summary", placeholder: "Brief intro about yourself...",  type: "textarea" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateFromPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAiError("");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Based on this description: "${prompt}"
              
Extract and return ONLY a JSON object (no markdown, no explanation) with these exact keys:
{
  "name": "full name",
  "email": "email address",
  "phone": "phone number",
  "skills": "comma-separated skills",
  "education": "education details",
  "experience": "work experience details",
  "summary": "professional summary in 2-3 sentences"
}

If any field cannot be determined from the description, use an empty string "".`,
            },
          ],
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setFormData({
        name:       parsed.name       || "",
        email:      parsed.email      || "",
        phone:      parsed.phone      || "",
        skills:     parsed.skills     || "",
        education:  parsed.education  || "",
        experience: parsed.experience || "",
        summary:    parsed.summary    || "",
      });

    } catch (err) {
      console.error(err);
      setAiError("Could not auto-fill. Please fill in the form manually.");
    } finally {
      setLoading(false);
    }
  };

  //FINAL RESUME VIEW 
  if (showResume) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center py-10 px-4">

        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <button
            onClick={() => setShowResume(false)}
            className="text-gray-400 hover:text-white transition text-sm"
          >
            ← Edit
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setScreen("home")}
              className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:border-[#712FDE] transition"
            >
              Start Over
            </button>
            <button
              onClick={() => window.print()}
              className="bg-[#712FDE] px-6 py-2 rounded-lg text-sm hover:bg-[#5a24b8] transition"
            >
              Print / Download
            </button>
          </div>
        </div>

        {/* Resume Card */}
        <div
          id="resume-output"
          className="bg-white text-black w-full max-w-3xl rounded-xl shadow-2xl p-10 print:shadow-none"
        >
          <div className="border-b-2 border-[#712FDE] pb-4 mb-6">
            <h1 className="text-3xl font-bold text-[#712FDE]">{formData.name || "Your Name"}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-600 flex-wrap">
              {formData.email && <span>📧 {formData.email}</span>}
              {formData.phone && <span>📞 {formData.phone}</span>}
            </div>
          </div>

          {formData.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-[#712FDE] mb-2 uppercase tracking-wide">Summary</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
            </section>
          )}

          {formData.skills && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-[#712FDE] mb-2 uppercase tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(",").map((s, i) => (
                  <span key={i} className="bg-[#f3eeff] text-[#712FDE] px-3 py-1 rounded-full text-sm">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {formData.education && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-[#712FDE] mb-2 uppercase tracking-wide">Education</h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{formData.education}</p>
            </section>
          )}

          {formData.experience && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-[#712FDE] mb-2 uppercase tracking-wide">Experience</h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{formData.experience}</p>
            </section>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-center text-gray-400">
            Built with Resumo • resumo.com
          </div>
        </div>

      </div>
    );
  }

  // ─── BUILDER FORM ────────────────────────────────────────────────────────
  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white flex flex-col items-center py-10 px-4">

      <div className="w-full max-w-2xl mb-6 flex items-center justify-between">
        <button
          onClick={() => setScreen("templates")}
          className="text-gray-400 hover:text-white transition text-sm"
        >
          ← Back to Templates
        </button>
        <span className="text-xs text-gray-500 capitalize">
          {type} · {selectedTemplate} template
        </span>
      </div>

      {/* AI Prompt Box */}
      <div className="w-full max-w-2xl bg-[#1A1A2E] p-6 rounded-xl mb-8 border border-[#712FDE33]">
        <p className="text-sm text-[#712FDE] font-medium mb-2">✨ Auto-fill with AI</p>
        <p className="text-xs text-gray-400 mb-3">
          Describe yourself and AI will fill in all the fields for you.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="e.g. I'm Rahul Sharma, a CSE graduate from RGPV 2024. I know React, Node.js and Python. I did an internship at TCS for 6 months..."
          className="w-full p-3 bg-[#0F0F1A] rounded-lg text-sm resize-none outline-none border border-gray-700 focus:border-[#712FDE] transition"
        />
        {aiError && <p className="text-red-400 text-xs mt-2">{aiError}</p>}
        <button
          onClick={generateFromPrompt}
          disabled={loading || !prompt.trim()}
          className="mt-3 bg-[#712FDE] px-5 py-2 rounded-lg text-sm hover:bg-[#5a24b8] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Filling in..." : "Auto-fill Form"}
        </button>
      </div>

      {/* Step Form */}
      <div className="w-full max-w-2xl bg-[#1A1A2E] p-8 rounded-xl border border-gray-800">

        <div className="flex justify-between items-center mb-6">
          <span className="text-xs text-gray-400">Step {step} of {totalSteps}</span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition ${
                  i + 1 <= step ? "bg-[#712FDE]" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <label className="block text-sm text-gray-300 mb-2 font-medium">
          {currentStep.label}
        </label>

        {currentStep.type === "input" ? (
          <input
            name={currentStep.field}
            value={formData[currentStep.field]}
            onChange={handleChange}
            placeholder={currentStep.placeholder}
            className="w-full p-3 bg-[#0F0F1A] rounded-lg outline-none border border-gray-700 focus:border-[#712FDE] transition text-sm"
          />
        ) : (
          <textarea
            name={currentStep.field}
            value={formData[currentStep.field]}
            onChange={handleChange}
            placeholder={currentStep.placeholder}
            rows={4}
            className="w-full p-3 bg-[#0F0F1A] rounded-lg outline-none border border-gray-700 focus:border-[#712FDE] transition text-sm resize-none"
          />
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-5 py-2 border border-gray-700 rounded-lg text-sm hover:border-[#712FDE] transition disabled:opacity-30"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (step < totalSteps) setStep((s) => s + 1);
              else setShowResume(true);
            }}
            className="px-6 py-2 bg-[#712FDE] rounded-lg text-sm hover:bg-[#5a24b8] transition"
          >
            {step < totalSteps ? "Next →" : "Generate Resume"}
          </button>
        </div>

      </div>
    </div>
  );
}