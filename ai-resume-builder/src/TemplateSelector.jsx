import { useState } from "react";

export default function TemplateSelector({ setScreen, setSelectedTemplate }) {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const templates = [
    {
      name: "classic",
      label: "Classic",
      img: "/resume.png",
      paid: false,
    },
    {
      name: "modern",
      label: "Modern",
      img: "/resume.png",
      paid: false,
    },
    {
      name: "minimal",
      label: "Minimal",
      img: "/resume.png",
      paid: false,
    },
    {
      name: "premium",
      label: "Premium Pro",
      img: "/resume.png",
      paid: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-10">

      <h1 className="text-3xl mb-10 text-[#712FDE]">
        Select Template
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {templates.map((template) => (
          <div
            key={template.name}
            className="bg-[#1A1A2E] p-4 rounded-xl"
          >

            {/* IMAGE */}
            <img
              src={template.img}
              alt="template"
              className="rounded-lg mb-4 h-[200px] w-full object-cover"
            />

            <h2 className="text-lg mb-4">{template.label}</h2>

            <button
              onClick={() => {
                if (template.paid) {
                  setShowPremiumModal(true);
                } else {
                  setSelectedTemplate(template.name);
                  setScreen("builder");
                }
              }}
              className="w-full py-2 bg-[#712FDE] rounded-lg"
            >
              {template.paid ? "Unlock Premium" : "Use Template"}
            </button>

          </div>
        ))}

      </div>

      {/* PREMIUM MODAL */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-[#1A1A2E] p-6 rounded-xl w-80">

            <h2 className="mb-4">Premium Template</h2>

            <p className="text-sm mb-4">
              Pay ₹200 to unlock premium templates
            </p>

            <button
              onClick={() => {
                setShowPremiumModal(false);
                setSelectedTemplate("premium");
                setScreen("builder");
              }}
              className="w-full bg-[#712FDE] py-2 rounded-lg mb-2"
            >
              Pay ₹200
            </button>

            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full border py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      )}
    </div>
  );
}