import React from "react";

const Home = () => {
  return (
    <div className="container text-center">
      <header className="jumbotron">
        <h3>Welcome to the Home Page</h3>
      </header>

      {/* ✅ Display Image */}
      <img 
        src="/homepage.png"  // Access from public folder
        alt="Homepage"
        className="img-fluid mt-3"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Home;
