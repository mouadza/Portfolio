import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Language = "en" | "fr";
type Theme = "light" | "dark";

interface HeroProps {
  language: Language;
  theme: Theme;
}

const heroTranslations: Record<
  Language,
  { intro: string; title: string; button: string }
> = {
  en: {
    intro: "Hi, I'm Mouad Zaouia",
    title: "A passionate Software Engineer",
    button: "View My Work",
  },
  fr: {
    intro: "Salut, je suis Mouad Zaouia",
    title: "Un ingénieur informatique passionné",
    button: "Voir mon travail",
  },
};

const Hero = ({ language, theme }: HeroProps) => {
  const { intro, title, button } = heroTranslations[language];
  const [displayedText, setDisplayedText] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex <= intro.length) {
        setDisplayedText(intro.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeText, 80);
      }
    };

    const resetTyping = () => {
      setDisplayedText("");
      currentIndex = 0;
      typeText();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) resetTyping();
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      clearTimeout(timeout);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [intro]);

  const isDark = theme === "dark";

  return (
    <section
      ref={heroRef}
      className={`relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden transition-colors duration-500 px-6 sm:px-8 md:px-16
        ${isDark ? " text-gray-100" : " text-gray-900"}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`w-full h-full bg-gradient-to-br ${
            isDark
              ? "from-blue-900 via-blue-800 to-blue-900"
              : "from-blue-100 via-blue-50 to-indigo-100"
          } animate-pulse`}
        />
      </div>

      {/* Floating glows */}
      <div
        className={`absolute -top-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full blur-3xl animate-pulse
          ${isDark ? "bg-blue-700 opacity-20" : "bg-blue-200 opacity-40"}`}
      />
      <div
        className={`absolute bottom-10 right-0 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse
          ${isDark ? "bg-sky-700 opacity-20" : "bg-indigo-200 opacity-40"}`}
      />

      {/* Content */}
      <div className="relative z-10 pt-32 flex flex-col items-center justify-center max-w-3xl space-y-6">
        <motion.h2
          className={`text-3xl sm:text-4xl md:text-6xl font-bold font-mono leading-tight bg-clip-text text-transparent ${
            isDark
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400"
              : "bg-gradient-to-r from-blue-600 to-indigo-600"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          {displayedText}
          <span className="animate-blink">|</span>
        </motion.h2>

        <motion.p
          className={`text-base pb-12 sm:text-lg md:text-2xl font-mono px-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {title}
        </motion.p>

        <motion.a
  href="#projects"
  className={`inline-block px-6 py-3 mt-6 rounded-full font-semibold tracking-wide text-white cursor-pointer
    ${
      isDark
        ? "bg-gradient-to-r from-blue-600 to-sky-500"
        : "bg-gradient-to-r from-blue-500 to-indigo-500"
    }`}
  initial={{ scale: 1, boxShadow: isDark ? "0px 5px 15px rgba(255,255,255,0.3)" : "0px 5px 15px rgba(59,130,246,0.4)" }}
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: isDark
      ? [
          "0px 5px 15px rgba(255,255,255,0.3)",
          "0px 8px 25px rgba(255,255,255,0.5)",
          "0px 5px 15px rgba(255,255,255,0.3)",
        ]
      : [
          "0px 5px 15px rgba(59,130,246,0.4)",
          "0px 8px 25px rgba(14,165,233,0.5)",
          "0px 5px 15px rgba(59,130,246,0.4)",
        ],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
  }}
  whileTap={{
    scale: 1.1,
    boxShadow: isDark
      ? "0px 12px 30px rgba(255,255,255,0.6)"
      : "0px 12px 30px rgba(14,165,233,0.6)",
  }}
>
  {button}
</motion.a>


      </div>

      <style>
        {`
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
