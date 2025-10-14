import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaCommentDots } from "react-icons/fa";

type Props = {
  theme: "light" | "dark";
};

const ContactButton = ({ theme }: Props) => {
  const [hovered, setHovered] = useState(false);

  const contacts = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/mouad-zaouia",
      color: "#0077B5",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      link: "https://wa.me/212670295382",
      color: "#25D366",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      link: "mailto:Mouad.Zaouia@emsi-edu.ma",
      color: "#D44638",
    },
  ];

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-end z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover icons */}
      <AnimatePresence>
        {hovered &&
          contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{
                  duration: 0.20,
                  ease: "easeOut",
                  delay: index * 0.02, // 👈 faster reveal
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 20px ${contact.color}`,
                }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-3 transition-all duration-200"
                style={{
                  backgroundColor:
                    theme === "dark" ? "#f3f4f6" : "#1f2937",
                  color: contact.color,
                }}
              >
                <Icon className="text-xl" />
              </motion.a>
            );
          })}
      </AnimatePresence>

      {/* Main Contact Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl font-bold transition-transform duration-300"
        style={{
          backgroundColor:
            theme === "dark" ? "#ffffff" /* sky-200 */ : "#3b82f6" /* blue-500 */,
          color: theme === "dark" ? "#3b82f6" /* dark blue text */ : "#ffffff",
        }}
      >
        <FaCommentDots />
      </motion.button>
    </div>
  );
};

export default ContactButton;
