import { motion } from "framer-motion";
import {
  SiReact,
  SiAngular,
  SiSpringboot,
  SiTailwindcss,
  SiMysql,
  SiPython,
  SiTensorflow,
  SiOpencv,
  SiGit,
  SiDocker,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";

type Language = "en" | "fr";
type Theme = "light" | "dark";

const techTranslations: Record<
  Language,
  { title: string; subtitle: string; categories: Record<string, string> }
> = {
  en: {
    title: "Technologies & Tools",
    subtitle: "A balanced mix of modern frameworks, AI libraries, and dev tools I master.",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      ai: "AI / Data Science",
      tools: "Dev Tools & Environments",
    },
  },
  fr: {
    title: "Technologies & Outils",
    subtitle:
      "Un ensemble moderne de frameworks, bibliothèques d’IA et outils de développement que je maîtrise.",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      ai: "IA / Science des données",
      tools: "Outils & Environnements de développement",
    },
  },
};

const categories = {
  frontend: [
    { name: "React", icon: SiReact, color: "text-sky-400", level: 80 },
    { name: "Angular", icon: SiAngular, color: "text-red-500", level: 50 },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "text-teal-400", level: 90 },
  ],
  backend: [
    { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500", level: 70 },
    { name: "MySQL", icon: SiMysql, color: "text-blue-400", level: 70 },
  ],
  ai: [
    { name: "Python", icon: SiPython, color: "text-yellow-400", level: 90 },
    { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-400", level: 65 },
    { name: "OpenCV", icon: SiOpencv, color: "text-indigo-400", level: 75 },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "text-red-400", level: 80 },
    { name: "VS Code", icon: DiVisualstudio, color: "text-blue-400", level: 90 },
    { name: "Docker", icon: SiDocker, color: "text-cyan-400", level: 65 },
  ],
};

const Technologies = ({ language, theme }: { language: Language; theme: Theme }) => {
  const { title, subtitle, categories: catLabels } = techTranslations[language];
  const isDark = theme === "dark";

  const textColor = isDark ? "text-sky-400" : "text-blue-600";
  const categoryColor = isDark ? "text-sky-400" : "text-blue-600";
  const percentageColor = isDark ? "text-sky-400" : "text-blue-600"; // neo blue

  const cardBg = isDark
    ? "bg-gray-800/40"
    : "bg-gray-100/60"; // lighter cards on light mode
  const borderColor = isDark ? "border-gray-700" : "border-gray-300";

  return (
    <section
      id="technologies"
      className={`min-h-screen py-20 px-8 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h3
          className={`text-4xl md:text-5xl font-bold mb-6 font-mono drop-shadow-[0_0_15px_rgba(0,150,255,0.5)] ${
            isDark
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          }`}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={`mb-16 text-lg max-w-3xl mx-auto text-gray-500`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {Object.entries(categories).map(([key, techList], i) => (
            <motion.div
              key={key}
              className={`${cardBg} backdrop-blur-lg border ${borderColor} rounded-2xl p-8 shadow-lg transition-all`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: false }}
            >
              <h4
                className={`text-2xl font-semibold mb-8 pb-2 border-b ${borderColor} ${categoryColor}`}
              >
                {catLabels[key as keyof typeof catLabels]}
              </h4>

              <div className="space-y-6">
                {techList.map((tech, j) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: j * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <Icon className={`text-2xl ${tech.color}`} />
                          <span className={`${textColor} font-medium`}>
                            {tech.name}
                          </span>
                        </div>
                        <span className={`${percentageColor} font-semibold`}>
                          {tech.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-300/30 dark:bg-gray-700/30 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-white h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
