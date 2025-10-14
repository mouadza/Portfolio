import { useState, useEffect } from "react";
import { FaGlobe, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Language = "en" | "fr";
type Theme = "light" | "dark";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const translations: Record<
  Language,
  { about: string; technologies: string; projects: string; contact: string; changeLang: string }
> = {
  en: {
    about: "About",
    technologies: "Technologies",
    projects: "Projects",
    contact: "Contact",
    changeLang: "English",
  },
  fr: {
    about: "À Propos",
    technologies: "Technologies",
    projects: "Projets",
    contact: "Contact",
    changeLang: "Français",
  },
};

const Header = ({ language, setLanguage, theme, setTheme }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);

      const sections = ["about", "technologies", "projects", "contact"];
      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sec);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const sections = ["about", "technologies", "projects", "contact"];
  const isDark = theme === "dark";

  // Theme-aware colors
  const bgColor = isDark ? "bg-gray-900/90" : "bg-white/90";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const accentColor = isDark ? "text-sky-400" : "text-blue-600";
  const hoverAccent = isDark ? "hover:text-sky-300" : "hover:text-blue-700";

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ${bgColor} ${textColor}`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo / Name */}
        <h1 
        className={`text-lg md:text-2xl font-bold font-mono drop-shadow-[0_0_15px_rgba(0,150,255,0.5)] ${
            isDark
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          }`}>
          Mouad Zaouia
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm md:text-lg">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative px-2 py-1 ${hoverAccent} transition-colors ${
                activeSection === sec ? `${accentColor} font-semibold` : ""
              }`}
            >
              {translations[language][sec as keyof typeof translations["en"]]}
              {activeSection === sec && (
                <motion.span
                  layoutId="underline"
                  className={`absolute left-0 bottom-0 h-0.5 w-full rounded ${
                    isDark ? "bg-sky-400" : "bg-blue-600"
                  }`}
                />
              )}
            </a>
          ))}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? "border-gray-600 bg-gray-800 hover:bg-gray-700"
                  : "border-gray-300 bg-white hover:bg-gray-100"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaGlobe />
              {translations[language].changeLang}
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg overflow-hidden ${
                    isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {(["en", "fr"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`ml-4 text-xl ${hoverAccent} transition-colors`}
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full md:hidden flex flex-col items-center gap-4 text-lg py-4 rounded-b-lg shadow-lg ${bgColor} ${textColor}`}
          >
            {sections.map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className={`px-4 py-2 ${hoverAccent} transition-colors ${
                  activeSection === sec ? `${accentColor} font-semibold` : ""
                }`}
                onClick={() => setMenuOpen(false)} // close menu on click
              >
                {translations[language][sec as keyof typeof translations["en"]]}
              </a>
            ))}

            <div className="flex items-center gap-3 mt-3">
              <FaGlobe className={accentColor} />
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value as Language);
                  setMenuOpen(false);
                }}
                className={`bg-transparent border ${isDark ? "border-sky-400" : "border-blue-500"} text-inherit rounded-md px-3 py-1 focus:outline-none`}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>

              <button
                onClick={() => { setTheme(isDark ? "light" : "dark");
                 setMenuOpen(false);}}
                className={`text-xl ${hoverAccent}`}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
