import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import foodDeliveryimg from "../assets/fooddelivery.png";
import foodDeliveryvideo from "../assets/foodDelivery.gif";
import weekEndPerm from "../assets/weekendpermanace.jpg";
import weekEndPermVideo from "../assets/weekEndPerm.gif";
import hotelRes from "../assets/HotelReservation.png";
import HotelReserVideo from "../assets/HotelReserVideo.gif";

interface Project {
  img: string;
  video: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  githubLink: string;
}

type Props = {
  language: "en" | "fr";
};

const projects: Project[] = [
  {
    img: foodDeliveryimg,
    video: foodDeliveryvideo,
    title: {
      en: "Food Delivery",
      fr: "Livraison de Nourriture",
    },
    description: {
      en: "A modern food ordering web app with real-time tracking and online payment integration.",
      fr: "Une application moderne de commande de nourriture avec suivi en temps réel et intégration du paiement en ligne.",
    },
    githubLink: "https://github.com/mouadza/Project-Frond-End",
  },
  {
    img: weekEndPerm,
    video: weekEndPermVideo,
    title: {
      en: "Weekend Permanence",
      fr: "Permanence du Week-end",
    },
    description: {
      en: "An internal scheduling platform that automates team weekend rotations.",
      fr: "Une plateforme interne de planification qui automatise les rotations de week-end des équipes.",
    },
    githubLink:
      "https://github.com/mouadza/Application-de-gestion-des-permanences-du-week-end",
  },
  {
    img: hotelRes,
    video: HotelReserVideo,
    title: {
      en: "Hotel Reservation",
      fr: "Réservation d'Hôtel",
    },
    description: {
      en: "A modern full-stack hotel booking web app built with ASP.NET, Entity Framework, and Tailwind CSS.",
      fr: "Une application web moderne de réservation d'hôtel développée avec ASP.NET, Entity Framework et Tailwind CSS.",
    },
    githubLink: "https://github.com/mouadza/HotelReservationFrontOffice",
  },

];

const Portfolio: React.FC<Props> = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const translations = {
    en: {
      title: "Projects",
      demo: "Demo",
      code: "Code",
    },
    fr: {
      title: "Projets",
      demo: "Démo",
      code: "Code",
    },
  };

  const t = translations[language];

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-96 h-96 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-lime-300 mb-12 font-mono drop-shadow-[0_0_15px_rgba(172,255,47,0.5)]"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-gray-800/60 border border-gray-700 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={project.img}
                alt={project.title[language]}
                className="w-full h-[250px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 backdrop-blur-sm">
                <h4 className="text-2xl font-semibold text-green-400 mb-2">
                  {project.title[language]}
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description[language]}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-green-500 rounded-full text-white hover:bg-green-400 transition-colors"
                  >
                    {t.demo}
                  </button>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
                  >
                    {t.code}
                  </a>
                </div>
              </div>

              <div className="p-4 text-left">
                <h4 className="text-xl font-semibold text-gray-100">
                  {project.title[language]}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 text-gray-200 rounded-2xl p-6 w-[90%] max-w-2xl relative shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-100 hover:text-gray-600 text-2xl"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">
                {selectedProject.title[language]}
              </h2>

              {selectedProject.video.endsWith(".mp4") ? (
                <video
                  src={selectedProject.video}
                  autoPlay
                  loop
                  muted
                  className="rounded-lg w-full mb-4"
                />
              ) : (
                <img
                  src={selectedProject.video}
                  alt={selectedProject.title[language]}
                  className="rounded-lg w-full mb-4"
                />
              )}

              <p className="text-gray-100 mb-4 text-center">
                {selectedProject.description[language]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
