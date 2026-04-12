import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0F0F1A] p-5 rounded-xl border border-gray-700">
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

