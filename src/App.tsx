import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import ContactIcons from "./components/ContactIcons";

type Language = "en" | "fr"; // Only English and French
type Theme = "light" | "dark";

const App = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light"); // default light

  // Apply theme to <html> for Tailwind dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`transition-colors duration-300 overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Fixed Header */}
      <div className="fixed z-50 w-full mx-auto">
        <Header
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />
      </div>

      {/* Main Content */}
      <main> {/* padding to prevent overlap with fixed header */}
        <Hero language={language} theme={theme} />
        <About language={language} theme={theme} />
        <Technologies language={language} theme={theme} />
        <Resume language={language} theme={theme} />
        <Projects language={language} theme={theme} />
        <Contact language={language} theme={theme} />
        <ContactIcons theme={theme} />
      </main>
    </div>
  );
};

export default App;
