import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Personicle</h1>
        <p>Your personal space for secure authentication and user management.</p>
      </header>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* About Section */}
        <section className="info-box">
          <h2>What is Personicle?</h2>
          <p>
            Personicle is a platform designed to provide seamless authentication and secure user
            management. It empowers individuals to have full control over their personal data while
            ensuring privacy and accessibility.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="info-box">
          <h2>How It Works</h2>
          <p>
            Personicle operates through a combination of secure authentication, encrypted data
            management, and user-centric access controls.
          </p>
          <img src="/authentication_flow.png" alt="Authentication Flow" className="info-image" />
        </section>

        {/* Key Components Section */}
        <section className="info-box">
          <h2>Key Components</h2>
          <img src="/personicle_pie_chart.png" alt="Key Components" className="info-image" />
        </section>
      </div>
    </div>
  );
};

export default Home;
