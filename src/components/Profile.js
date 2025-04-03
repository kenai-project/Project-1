import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return (
      <div className="container text-center mt-5">
        <h3 className="text-danger">User not logged in</h3>
      </div>
    );
  }

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-lg text-center">
        
        {/* ✅ Profile Image */}
        <img
          src={currentUser.profileImage || "/default-profile.png"} // Default image
          alt="Profile"
          className="profile-img-card"
        />

        <header>
          <h3><strong>{currentUser.username}</strong>'s Profile</h3>
        </header>
        <hr />

        <p><strong>ID:</strong> {currentUser.id}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>

        {/* ✅ Improved Role Formatting */}
        <strong>Roles:</strong>
        <ul>
          {currentUser.roles?.length ? (
            currentUser.roles.map((role, index) => (
              <li key={index}>{role.replace("ROLE_", "").toLowerCase()}</li>
            ))
          ) : (
            <li>User</li>
          )}
        </ul>

        {/* ✅ Improved Logout Button */}
        <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
