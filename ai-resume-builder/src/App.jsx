import { useState } from "react";
import LandingPage from "./LandingPage.jsx";
import TemplatesPage from "./TemplateSelector";
import BuilderPage from "./BuilderPage.jsx";
import FAQItem from "./FAQItem.jsx";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [type, setType] = useState("");

  return (
    <>
      {screen === "home" && (
        <LandingPage setScreen={setScreen} setType={setType} />
      )}

      {screen === "templates" && (
        <TemplatesPage type={type} setScreen={setScreen} />
      )}

      {screen === "builder" && (
       <BuilderPage setScreen={setScreen} />
      )}

    </>
    
  );
}
