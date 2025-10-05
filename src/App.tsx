import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";

type Language = "en" | "fr" | "ar";

const App = () => {
  const [language, setLanguage] = useState<Language>("en"); // Centralized language state

  return (
    <div className="bg-gray-100 text-gray-800 overflow-hidden">
      <div className="fixed z-50  mx-auto w-full">
      <Header language={language} setLanguage={setLanguage} />
      </div>
      <main>
        <Hero language={language} />
        <About language={language} />
        <Resume  />
        <Projects  />
        <Contact  />
      </main>
    </div>
  );
};

export default App;
