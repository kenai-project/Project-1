import React, { useEffect, useState } from "react";
import "./Home.css";

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
        <h1>Welcome to Personicle</h1>
        <p>Your personal space for secure authentication and user management.</p>
      </header>

      {/* Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-inner-fixed-size">
          <img
            src={carouselData[activeIndex].img}
            alt={carouselData[activeIndex].title}
            className="carousel-image"
          />
        </div>

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
