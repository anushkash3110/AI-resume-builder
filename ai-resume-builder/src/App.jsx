import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TemplateSelector from "./pages/TemplateSelector";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [type, setType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <>
      {screen === "home" && (
        <LandingPage setScreen={setScreen} setType={setType} />
      )}

      {screen === "templates" && (
        <TemplateSelector
          type={type}
          setScreen={setScreen}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}

      {screen === "builder" && (
        <BuilderPage
          setScreen={setScreen}
          selectedTemplate={selectedTemplate}
        />
      )}
    </>
  );
}