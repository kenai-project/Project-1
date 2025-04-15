import React from "react";
import "./Home.css";
import { FaLock, FaUserShield, FaRocket, FaShieldAlt, FaKey, FaUserCheck, FaSmileBeam } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>🔐 Welcome to <span className="brand-name">Personicle</span></h1>
        <p>Your secure gateway to personal data control and seamless authentication.</p>
      </header>

      {/* Key Info Sections */}
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

      {/* Features */}
      <motion.section 
        className="info-box"
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

      {/* Testimonials */}
      <motion.section 
        className="testimonial-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2><FaSmileBeam /> User Voices</h2>
        <div className="testimonial-cards">
          <motion.div className="testimonial-card" whileHover={{ scale: 1.03 }}>
            <p>"Finally a system that treats privacy seriously. Personicle gave me peace of mind."</p>
            <span>- Sarah K.</span>
          </motion.div>
          <motion.div className="testimonial-card" whileHover={{ scale: 1.03 }}>
            <p>"The smooth authentication flow is a game-changer for our platform."</p>
            <span>- Alex R.</span>
          </motion.div>
        </div>
      </motion.section>

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
