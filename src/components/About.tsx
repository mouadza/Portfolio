import profile from "../assets/mouad.png";
import { motion } from "framer-motion";

type Language = "en" | "fr";
type Theme = "light" | "dark";

interface AboutProps {
  language: Language;
  theme: Theme;
}

const translations: Record<
  Language,
  { aboutTitle: string; aboutText: string; contactMe: string }
> = {
  en: {
    aboutTitle: "About Me",
    aboutText:
      "Hi, I'm Mouad Zaouia, a passionate software engineer dedicated to crafting efficient and scalable applications. With a strong foundation in web development, I thrive on solving complex challenges and creating user-focused digital experiences. Outside of work, I enjoy coding and music.",
    contactMe: "Contact Me",
  },
  fr: {
    aboutTitle: "À Propos de Moi",
    aboutText:
      "Salut, je suis Mouad Zaouia, un ingénieur logiciel passionné, dédié à la création d’applications efficaces et évolutives. Avec une solide expérience en développement web, j’aime résoudre des défis complexes et créer des expériences numériques centrées sur l’utilisateur. En dehors du travail, j’aime coder et écouter de la musique.",
    contactMe: "Me Contacter",
  },
};

const About: React.FC<AboutProps> = ({ language, theme }) => {
  const { aboutTitle, aboutText, contactMe } =
    translations[language] || translations.en;
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`relative flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-12 md:px-20 py-20 transition-colors duration-500
        ${isDark ? "text-gray-100" : "text-gray-900"}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`w-full h-full bg-gradient-to-br ${
            isDark
              ? "from-blue-900 via-blue-800 to-blue-900"
              : "from-blue-100 via-blue-50 to-indigo-100"
          }`}
        />
      </div>

      {/* Floating Glows */}
      <div
        className={`absolute -top-16 -left-16 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl ${
          isDark ? "bg-blue-700 opacity-20" : "bg-blue-200 opacity-40"
        }`}
      />
      <div
        className={`absolute bottom-16 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl ${
          isDark ? "bg-sky-700 opacity-20" : "bg-indigo-200 opacity-40"
        }`}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12 max-w-6xl w-full">
        {/* Text Section */}
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h3
             
            className={`text-4xl md:text-5xl font-bold mb-6 font-mono drop-shadow-[0_0_15px_rgba(0,150,255,0.5)] ${
            isDark
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          }`}
          >
            {aboutTitle}
          </h3>
          <p
            className={`text-lg sm:text-xl leading-relaxed font-mono ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {aboutText}
          </p>

          <motion.a
            href="#contact"
            className={`inline-block px-8 py-3 mt-6 rounded-full font-semibold tracking-wide text-white cursor-pointer ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg"
            }`}
            initial={{ scale: 1 }}
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
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            whileTap={{
              scale: 1.1,
              boxShadow: isDark
                ? "0px 12px 30px rgba(255,255,255,0.6)"
                : "0px 12px 30px rgba(14,165,233,0.6)",
            }}
          >
            {contactMe}
          </motion.a>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden flex-shrink-0
            ${isDark ? "bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.4)]" : "bg-blue-900 shadow-[0_0_40px_rgba(30,64,175,0.6)]"}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <img
            src={profile}
            alt="Mouad Zaouia"
            className="w-full h-full object-cover rounded-full transition-all duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
