export default function TemplateSelector({ setScreen, setSelectedTemplate, type }) {

  const templates = [
    { name: "classic",  label: "Classic",  img: "/resume.png" },
    { name: "modern",   label: "Modern",   img: "/resume.png" },
    { name: "minimal",  label: "Minimal",  img: "/resume.png" },
    { name: "elegant",  label: "Elegant",  img: "/resume.png" },
  ];

  const typeLabel =
    type === "resume"  ? "Resume" :
    type === "cover"   ? "Cover Letter" :
    "Resume Website";

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-10">

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => setScreen("home")}
          className="text-gray-400 hover:text-white transition text-sm"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-semibold text-[#712FDE]">
          Select a {typeLabel} Template
        </h1>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.name}
            className="bg-[#1A1A2E] p-4 rounded-xl hover:shadow-[0_0_20px_#712FDE55] transition"
          >
            <img
              src={template.img}
              alt={template.label}
              className="rounded-lg mb-4 h-[200px] w-full object-cover"
            />
            <h2 className="text-lg mb-4 font-medium">{template.label}</h2>
            <button
              onClick={() => {
                setSelectedTemplate(template.name);
                setScreen("builder");
              }}
              className="w-full py-2 bg-[#712FDE] rounded-lg hover:bg-[#5a24b8] transition font-medium"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}