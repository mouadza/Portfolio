import profile from "../assets/mouad.png";
import { motion } from "framer-motion";


type Language = "en" | "fr";

interface AboutProps {
  language: Language;
}


const translations: Record<Language, { aboutTitle: string; aboutText: string; contactMe: string }> = {
  en: {
    aboutTitle: "About Me",
    aboutText: "I’m a software engineer passionate about AI and full-stack development.",
    contactMe: "Contact Me",
  },
  fr: {
    aboutTitle: "À propos de moi",
    aboutText: "Je suis un ingénieur logiciel passionné par l’IA et le développement full-stack.",
    contactMe: "Contactez-moi",
  },
};


const About: React.FC<AboutProps> = ({ language }) => {
  const { aboutTitle, aboutText, contactMe } =
    translations[language] || translations.en;

  return (
    <section
      id="about"
      className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,0,0.15),_transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,0,0.1),_transparent_70%)]"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Profile Image Section */}
        
        <motion.div
          className="w-full md:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-lime-400 shadow-[0_0_40px_rgba(172,255,47,0.6)]">
            <img
              src={profile}
              alt="Mouad Zaouia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-black/20"></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-4xl font-bold text-lime-300 font-mono mb-4">
            {aboutTitle}
          </h3>
          <p className="text-lg text-gray-200 leading-relaxed font-mono">
            {aboutText}
          </p>

          {/* Animated Contact Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-6"
          >
            <a
              href="#contact"
              className="relative px-8 py-3 bg-gradient-to-r from-lime-500 to-green-700 rounded-full text-white font-semibold tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(50,205,50,0.7)] transition-all duration-300"
            >
              {contactMe}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-400 to-green-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
