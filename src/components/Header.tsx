import { useState, useEffect } from "react";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Language = "en" | "fr" | "ar";

const translations: Record<
  Language,
  { about: string; projects: string; contact: string; changeLang: string }
> = {
  en: { about: "About", projects: "Projects", contact: "Contact", changeLang: "English" },
  fr: { about: "À Propos", projects: "Projets", contact: "Contact", changeLang: "Français" },
  ar: { about: "معلومات عنا", projects: "المشاريع", contact: "اتصل", changeLang: "العربية" },
};

const Header = ({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);

      // Highlight active section
      const sections = ["about", "projects", "contact"];
      for (let sec of sections) {
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed top-0 left-0 w-full bg-gray-900 text-green-400 py-4 px-6 shadow-lg z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold font-mono">My Portfolio</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm md:text-lg">
          {["about", "projects", "contact"].map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative px-2 py-1 hover:text-lime-400 transition-colors ${
                activeSection === sec ? "text-lime-400 font-semibold" : ""
              }`}
            >
              {translations[language][sec as keyof typeof translations["en"]]}
              {activeSection === sec && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-0.5 bg-lime-400 w-full rounded"
                />
              )}
            </a>
          ))}

          {/* Language Dropdown */}
          <div className="relative z-50">
            <button
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaGlobe className="text-lg" />
              {translations[language].changeLang}
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-32 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {(["en", "fr", "ar"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
            className="md:hidden mt-4 flex flex-col items-center gap-4 text-lg bg-gray-900 py-4 rounded-b-lg shadow-lg"
          >
            {["about", "projects", "contact"].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className={`px-4 py-2 hover:text-lime-400 transition-colors ${
                  activeSection === sec ? "text-lime-400 font-semibold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {translations[language][sec as keyof typeof translations["en"]]}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
