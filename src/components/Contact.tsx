import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type Props = {
  language: "en" | "fr";
  theme: "light" | "dark";
};

const Contact = ({ language, theme }: Props) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isDark = theme === "dark";

  const t = {
    en: {
      title: "Get in Touch",
      desc: "Let's collaborate or just say hello. You can reach me directly or send a quick message below.",
      labels: { name: "Name", email: "Email", message: "Message" },
      send: "Send Message",
      sending: "Sending...",
      popupTitle: "Thank You!",
      popupMsg: "Your message has been sent successfully.",
    },
    fr: {
      title: "Contactez-moi",
      desc: "Travaillons ensemble ou dites simplement bonjour. Contactez-moi directement ou envoyez un message ci-dessous.",
      labels: { name: "Nom", email: "Email", message: "Message" },
      send: "Envoyer le message",
      sending: "Envoi...",
      popupTitle: "Merci !",
      popupMsg: "Votre message a été envoyé avec succès.",
    },
  }[language];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert(language === "en" ? "Please fill all fields." : "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        "service_3uo5w76",
        "template_8nfhu6n",
        formData,
        "wohtiXV6mCo4QPgeM"
      );
      setShowPopup(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowPopup(false), 3000);
    } catch {
      alert(language === "en" ? "Message failed. Try again." : "Échec de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 px-6 relative ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT - Contact Links */}
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col items-center md:items-start space-y-6"
>
  <h2
    className={`text-4xl font-bold bg-gradient-to-r ${
      isDark
        ? "from-sky-400 to-blue-400"
        : "from-blue-600 to-sky-500"
    } bg-clip-text text-transparent`}
  >
    {t.title}
  </h2>
  <p className="max-w-md text-center md:text-left opacity-80">{t.desc}</p>

  <div className="grid grid-cols-3 gap-8 mt-6">
    {contacts.map(({ name, icon: Icon, link, color }) => (
      <motion.a
        key={name}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className={`group flex flex-col items-center justify-center space-y-2 transition-all duration-300`}
      >
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
            isDark ? "bg-white" : "bg-gray-800"
          } group-hover:shadow-xl`}
          style={{
            border: `2px solid ${color}`,
            color: color,
          }}
        >
          <Icon className="text-3xl transition-transform duration-300 group-hover:scale-110" />
        </div>
        <span
          className={`font-medium text-sm ${
            isDark ? "text-gray-200" : "text-gray-700"
          } group-hover:text-[${color}]`}
        >
          {name}
        </span>
      </motion.a>
    ))}
  </div>
</motion.div>


        {/* RIGHT - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-8 rounded-2xl shadow-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {(["name", "email", "message"] as const).map((field) => (
            <div key={field} className="mb-5 text-left">
              <label
                className={`block font-semibold mb-2 ${
                  isDark
                    ? "text-sky-300"
                    : "text-blue-600"
                }`}
              >
                {t.labels[field]}
              </label>
              {field === "message" ? (
                <textarea
                  name={field}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
              )}
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            {loading ? t.sending : t.send}
          </motion.button>
        </motion.form>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div
            className={`p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm text-center ${
              isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <div
              className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full ${
                isDark ? "bg-blue-100 text-blue-500" : "bg-blue-100 text-blue-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-1">{t.popupTitle}</h4>
            <p>{t.popupMsg}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
