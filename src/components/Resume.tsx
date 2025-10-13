import { FaDownload, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import resumeEN from "../assets/MOUAD_ZAOUIA_CV_EN.pdf";
import resumeFR from "../assets/MOUAD_ZAOUIA_CV_FR.pdf";

type Props = {
  language: "en" | "fr";
};

const Resume = ({ language }: Props) => {
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
      className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-center overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,0,0.12),_transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_70%)]"></div>

      <motion.div
        className="container mx-auto text-gray-100 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-lime-300 mb-6 font-mono drop-shadow-[0_0_15px_rgba(172,255,47,0.5)]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h3>

        <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed font-mono opacity-90">
          {t.description}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* View Button */}
          <motion.a
            href={selectedResume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300"
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(50,205,50,0.6)] transition-all duration-300"
          >
            <FaDownload className="text-lg" />
            {t.download}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
