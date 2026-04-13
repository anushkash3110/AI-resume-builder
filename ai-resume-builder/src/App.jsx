import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TemplateSelector from "./pages/TemplateSelector";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [type, setType] = useState("resume");

  return (
    <>
      {screen === "home" && (
        <LandingPage setScreen={setScreen} setType={setType} />
      )}

      {screen === "templates" && (
        <TemplateSelector
          setScreen={setScreen}
          setSelectedTemplate={setSelectedTemplate}
          type={type}
        />
      )}

      {screen === "builder" && (
        <BuilderPage
          selectedTemplate={selectedTemplate}
          type={type}
          setScreen={setScreen}
        />
      )}
    </>
  );
}