import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import bgLive from "../assets/HeroBg.gif";

type Language = "en" | "fr";

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

const Hero = ({ language }: { language: Language }) => {
  const { intro, title, button } = heroTranslations[language];

  const [displayedText, setDisplayedText] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex <= intro.length) {
        setDisplayedText(intro.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeText, 80); // faster typing
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
          if (entry.isIntersecting) {
            resetTyping();
          }
        });
      },
      { threshold: 0.5 } // triggers when 50% of section is visible
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      clearTimeout(timeout);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [intro]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen text-green-400 text-center overflow-hidden"
    >
      {/* Background */}
      <img
        src={bgLive}
        alt="Background Animation"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/70 to-black/80 backdrop-blur-[1px]" />

      {/* Floating glows */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-lime-400/10 rounded-full blur-2xl animate-pulse" />

      {/* Hero Content */}
      <div className="relative flex items-center justify-center flex-col h-full text-white px-6">
        {/* Typing Intro */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-mono mb-4 bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(144,238,144,0.6)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          {displayedText}
          <span className="animate-blink">|</span>
        </motion.h2>

        {/* Title */}
        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-10 font-mono max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {title}
        </motion.p>

        {/* Button */}
        <motion.a
          href="#projects"
          className="px-8 py-3 mt-4 relative rounded-full bg-gradient-to-r from-green-500 to-lime-500 text-gray-900 font-semibold tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(144,238,144,0.6)] transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
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
