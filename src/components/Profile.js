import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="text-danger">User not logged in</h3>
        </header>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong>'s Profile
        </h3>
      </header>
      <p><strong>Id:</strong> {currentUser.id}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <strong>Authorities:</strong>
      <ul>
        <li>User</li> {/* Hardcoded default role */}
      </ul>
    </div>
  );
};

export default Profile;
