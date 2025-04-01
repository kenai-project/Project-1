import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import "./Register.css"; // Import CSS file

// Validation functions
const required = (value) => !value && <div className="invalid-feedback d-block">This field is required!</div>;

const validEmail = (value) => !isEmail(value) && <div className="invalid-feedback d-block">Invalid email.</div>;

const vusername = (value) =>
  (value.length < 3 || value.length > 20) && (
    <div className="invalid-feedback d-block">Username must be between 3 and 20 characters.</div>
  );

const vpassword = (value) =>
  (value.length < 6 || value.length > 40) && (
    <div className="invalid-feedback d-block">Password must be between 6 and 40 characters.</div>
  );

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleRegister = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    setMessage("");
    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const response = await AuthService.register(username, email, password);
        console.log("API Response:", response); // ✅ Debugging API response
        setMessage(response?.data?.message || "Registration successful!"); // ✅ Prevents undefined error
        setSuccessful(true);
      } catch (error) {
        console.error("Registration error:", error); // ✅ Debugging API error
        const resMessage =
          error?.response?.data?.message || // ✅ Safe error handling
          error?.message || 
          "Something went wrong!";
        setMessage(resMessage);
        setSuccessful(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("Validation errors:", checkBtn.current.context._errors); // ✅ Debugging validation errors
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,abstract')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card card-container">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required, vusername]} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
