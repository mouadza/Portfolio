import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_3uo5w76",
        "template_8nfhu6n",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "wohtiXV6mCo4QPgeM"
      );

      setShowPopup(true); // Show popup on success
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setShowPopup(false), 3000); // Auto-hide after 3 seconds
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-gradient-to-b from-gray-800 to-gray-700 text-center">
      <div className="mx-auto text-gray-200 max-w-lg">
        <motion.h3 
        className="text-4xl md:text-5xl font-bold text-lime-300 mb-6 font-mono drop-shadow-[0_0_15px_rgba(172,255,47,0.5)]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h3>
        <p className="mb-8 text-lg opacity-80">I'd love to hear from you! Send me a message below.</p>
        
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-lg">
          <div className="mb-4">
            <label className="block text-left text-gray-300 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-left text-gray-300 font-semibold">Message</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-all duration-300"
            disabled={loading}
          >
            <FaPaperPlane className="text-lg" />
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm transform scale-100 transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-2xl font-semibold mb-2 text-gray-800">Thank You!</h4>
        <p className="text-gray-600 text-center">
          Your message has been sent successfully.
        </p>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default Contact;
