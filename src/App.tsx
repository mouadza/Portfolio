import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";

type Language = "en" | "fr"; // ✅ Only English and French

const App = () => {
  const [language, setLanguage] = useState<Language>("en"); // Centralized language state

  return (
    <div className="bg-gray-100 text-gray-800 overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed z-50 w-full mx-auto">
        <Header language={language} setLanguage={setLanguage} />
      </div>

      {/* Main Content */}
      <main>
        <Hero language={language} />
        <About language={language} />
        <Technologies language={language} />
        <Resume language={language} />
        <Projects language={language}  />
        <Contact  language={language} />
      </main>
    </div>
  );
};

export default App;
