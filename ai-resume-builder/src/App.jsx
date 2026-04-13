import { useState } from "react";
import LandingPage from "./LandingPage";
import TemplateSelector from "./TemplateSelector";
import BuilderPage from "./BuilderPage";

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