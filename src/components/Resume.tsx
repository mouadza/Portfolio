import { FaDownload, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import resumeEN from "../assets/MOUAD_ZAOUIA_CV_EN.pdf";
import resumeFR from "../assets/MOUAD_ZAOUIA_CV_FR.pdf";

type Props = {
  language: "en" | "fr";
  theme: "light" | "dark";
};

const Resume = ({ language, theme }: Props) => {
  const isDark = theme === "dark";

  const translations = {
    en: {
      title: "My Resume",
      description:
        "Explore my professional background, skills, and experience. You can view it online or download it below.",
      view: "View Resume",
      download: "Download Resume",
    },
    fr: {
      title: "Mon CV",
      description:
        "Découvrez mon parcours professionnel, mes compétences et mon expérience. Vous pouvez le consulter en ligne ou le télécharger ci-dessous.",
      view: "Voir le CV",
      download: "Télécharger le CV",
    },
  };

  const t = translations[language];
  const selectedResume = language === "fr" ? resumeFR : resumeEN;

  return (
    <section
      id="resume"
      className={`relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden transition-colors duration-500 px-6 sm:px-8 md:px-16
        ${isDark ? "text-gray-100" : "text-gray-900"}`}
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


      {/* Content */}
      <div className="relative z-10  flex flex-col items-center justify-center max-w-3xl space-y-6">
        <motion.h3
          className={`text-4xl md:text-5xl font-bold mb-6 font-mono drop-shadow-[0_0_15px_rgba(0,150,255,0.5)] ${
            isDark
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          }`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h3>

        <motion.p
          className={`text-lg sm:text-xl  md:text-2xl font-mono px-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {t.description}
        </motion.p>

        <div className="flex flex-wrap pt-10 justify-center gap-6 mt-6">
          {/* View Button */}
          <motion.a
            href={selectedResume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold tracking-wide cursor-pointer
              ${
                isDark
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
              }`}
          >
            <FaEye className="text-lg" />
            {t.view}
          </motion.a>

          {/* Download Button */}
          <motion.a
            href={selectedResume}
            download={language === "fr" ? "Mouad_Zaouia_CV_FR.pdf" : "Mouad_Zaouia_CV_EN.pdf"}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold tracking-wide cursor-pointer
              ${
                isDark
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                  : "bg-gradient-to-r from-blue-400 to-blue-200 text-white shadow-lg hover:shadow-[0_0_25px_rgba(14,165,233,0.4)]"
              }`}
          >
            <FaDownload className="text-lg" />
            {t.download}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
