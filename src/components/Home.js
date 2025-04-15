import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaLock, FaUserShield, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaUserCheck, FaShieldAlt, FaKey, FaSmileBeam } from "react-icons/fa";


const carouselData = [
  {
    img: "/homepage.png",
    title: "What is Personicle?",
    desc: "Personicle is a platform designed to provide seamless authentication and secure user management. It empowers individuals to have full control over their personal data while ensuring privacy and accessibility.",
  },
  {
    img: "/authentication_flow.png",
    title: "How It Works",
    desc: "Personicle operates through a combination of secure authentication, encrypted data management, and user-centric access controls.",
  },
  {
    img: "/personicle_pie_chart.png",
    title: "Key Components",
    desc: "Our core includes secure login, profile management, health data integration, and AI-driven insights.",
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => setActiveIndex(index);

  return (
    <div className="home-container">
      <header className="header">
        <h1>🔐 Welcome to <span className="brand-name">Personicle</span></h1>
        <p>Your secure gateway to personal data control and seamless authentication.</p>
      </header>

      <div className="content-wrapper">
        {/* About Section */}
        <section className="info-box">
          <h2><FaLock /> What is Personicle?</h2>
          <p>
            Personicle is a cutting-edge platform that empowers users to take full control of their
            personal data. With privacy as a priority, we offer a decentralized and secure
            authentication environment built for the future of digital identity.
          </p>
        </section>
      {/* Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-inner-fixed-size">
          <img
            src={carouselData[activeIndex].img}
            alt={carouselData[activeIndex].title}
            className="carousel-image"
          />
        </div>

        {/* How It Works */}
        <section className="info-box">
          <h2><FaUserShield /> How It Works</h2>
          <p>
            Through encrypted authentication protocols, blockchain-based verifications, and
            user-consented access layers, Personicle ensures your data remains yours.
          </p>
          <img src="/authentication_flow.png" alt="Authentication Flow" className="info-image" />
        </section>
        {/* Indicators */}
        <div className="carousel-indicators-custom">
          {carouselData.map((_, idx) => (
            <button
              key={idx}
              className={activeIndex === idx ? "active" : ""}
              onClick={() => handleIndicatorClick(idx)}
            />
          ))}
        </div>

        {/* Key Components */}
        <section className="info-box">
          <h2><FaRocket /> Key Components</h2>
          <ul>
            <li>✔️ Decentralized Identity Management</li>
            <li>✔️ Encrypted Personal Data Vaults</li>
            <li>✔️ Role-based Access Controls</li>
            <li>✔️ Real-time Authentication Monitoring</li>
            <li>✔️ User-first Design & Privacy</li>
          </ul>
          <img src="/personicle_pie_chart.png" alt="Key Components" className="info-image" />
        </section>

        {/* Why Choose Us */}
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
      <p>Your data is encrypted and always under your control.</p>
    </motion.div>
    <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
      <FaKey size={30} />
      <h4>Secure Authentication</h4>
      <p>Robust multi-factor systems to protect your identity.</p>
    </motion.div>
    <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
      <FaUserCheck size={30} />
      <h4>Role-Based Access</h4>
      <p>Flexible permission models tailored to your needs.</p>
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
  <h2><FaSmileBeam /> What Our Users Say</h2>
  <div className="testimonial-cards">
    <motion.div className="testimonial-card" whileHover={{ scale: 1.03 }}>
      <p>"Personicle gave me complete control over my identity online. Finally, a product that respects privacy."</p>
      <span>- Sarah K., Data Scientist</span>
    </motion.div>
    <motion.div className="testimonial-card" whileHover={{ scale: 1.03 }}>
      <p>"The authentication system is seamless and secure. I feel confident managing users on my platform."</p>
      <span>- Alex R., Platform Admin</span>
    </motion.div>
  </div>
</motion.section>


        {/* Call to Action */}
        <section className="cta-section">
          <h2>Ready to take back control?</h2>
          <p>Join Personicle today and experience secure, user-centered identity management.</p>
          <a href="/register" className="cta-button">Get Started</a>
        </section>
        {/* Caption */}
        <div className="carousel-caption-below">
          <h3>{carouselData[activeIndex].title}</h3>
          <p>{carouselData[activeIndex].desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
