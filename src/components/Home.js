import React from "react";

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <header className="mb-4">
        <h1 className="fw-bold">Welcome to Personicle</h1>
        <p className="text-muted">Your personal space for secure authentication and user management.</p>
      </header>

      {/* ✅ Display Image */}
      <img 
        src="/homepage.png"  // Image should be placed in the public folder
        alt="Homepage"
        className="img-fluid rounded shadow"
        style={{ maxWidth: "80%", height: "auto" }}
      />

      <p className="mt-3 text-secondary">Sign up or log in to get started!</p>
    </div>
  );
};

export default Home;
