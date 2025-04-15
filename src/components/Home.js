import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  FaLock, FaUserShield, FaRocket,
  FaShieldAlt, FaKey, FaUserCheck, FaSmileBeam
} from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Finally a system that treats privacy seriously. Personicle gave me peace of mind.",
    author: "- Sarah K.",
  },
  {
    quote: "The smooth authentication flow is a game-changer for our platform.",
    author: "- Alex R.",
  },
  {
    quote: "Personicle is the future of identity management. Super intuitive.",
    author: "- Ravi M.",
  },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1>🔐 Welcome to <span className="brand-name">Personicle</span></h1>
        <p>Your secure gateway to personal data control and seamless authentication.</p>
      </header>

      {/* Info Sections */}
      <section className="info-box">
        <h2><FaLock /> What is Personicle?</h2>
        <p>
          Personicle empowers you to take control of your personal data with private,
          decentralized authentication and secure user management.
        </p>
      </section>

      <section className="info-box">
        <h2><FaUserShield /> How It Works</h2>
        <p>
          We use end-to-end encryption, role-based access control, and privacy-first protocols
          to keep your identity safe and accessible only to you.
        </p>
      </section>

      <section className="info-box">
        <h2><FaRocket /> Key Components</h2>
        <ul className="key-points">
          <li>✔️ Decentralized Identity</li>
          <li>✔️ Encrypted Data Vaults</li>
          <li>✔️ Real-time Authentication</li>
          <li>✔️ Role-based Access</li>
        </ul>
      </section>

      {/* Why Choose Us + Testimonials Side by Side */}
      <div className="dual-section">
        {/* Why Choose Us */}
        <motion.section
          className="info-box dual-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>✨ Why Choose Us?</h2>
          <div className="feature-grid">
            <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
              <FaShieldAlt size={30} />
              <h4>Privacy First</h4>
              <p>Your data, your control—always encrypted.</p>
            </motion.div>
            <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
              <FaKey size={30} />
              <h4>Secure Access</h4>
              <p>Multi-factor authentication at its finest.</p>
            </motion.div>
            <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
              <FaUserCheck size={30} />
              <h4>Smart Permissions</h4>
              <p>Tailored access models that adapt to you.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Auto Slide */}
        <motion.section
          className="testimonial-section dual-box"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2><FaSmileBeam /> User Voices</h2>
          <motion.div
            className="testimonial-card"
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>"{testimonials[currentTestimonial].quote}"</p>
            <span>{testimonials[currentTestimonial].author}</span>
          </motion.div>
        </motion.section>
      </div>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to take back control?</h2>
        <p>Join Personicle and experience the future of secure identity management.</p>
        <a href="/register" className="cta-button">Get Started</a>
      </section>
    </div>
  );
};

export default Home;
