import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import PrivateRoute from "./components/PrivateRoute";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logOut = () => {
      AuthService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(null);
      navigate("/login");
    };

    const user = AuthService.getCurrentUser();
    if (user && user.roles) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, [navigate]);

  return (
    <div>
      {/* ✅ Fixed Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Personicle</Link>

          {/* ✅ Fix Navbar Toggle Button */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ✅ Fix Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
              <li className="nav-item"><Link to="/contactus" className="nav-link">Contact Us</Link></li>
              {showModeratorBoard && <li className="nav-item"><Link to="/mod" className="nav-link">Moderator</Link></li>}
              {showAdminBoard && <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>}
            </ul>

            {/* ✅ Fix Authentication Buttons */}
            <ul className="navbar-nav ms-auto">
              {currentUser ? (
                <>
                  <li className="nav-item"><Link to="/profile" className="nav-link">{currentUser.username}</Link></li>
                  <li className="nav-item">
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => EventBus.dispatch("logout")}>
                      LogOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link to="/register" className="btn btn-primary btn-sm mx-1">Sign Up</Link></li>
                  <li className="nav-item"><Link to="/login" className="btn btn-success btn-sm mx-1">Login</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mod" element={<PrivateRoute roles={["ROLE_MODERATOR"]}><BoardModerator /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute roles={["ROLE_ADMIN"]}><BoardAdmin /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
