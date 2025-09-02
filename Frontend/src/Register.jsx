import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import "./Register.css";

export default function Register({ setToken }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);

      // ✅ token + user info backend se leke store karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        userId: res.data.userId,
        username: res.data.username
      }));

      // ✅ App.jsx me token state set karo
      setToken(res.data.token);

      navigate("/chat"); // direct chat pe bhej do
    } catch (err) {
      alert(err.response?.data?.error || "Error occurred");
    }
  };

  // ✅ Google Register/Login (same route as login, backend me handle hoga)
  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:8080/api/auth/google"; 
  };

  return (
  <div className="register-container">
    <h2>Register</h2>

    <form onSubmit={handleSubmit}>
      <input 
        name="username" 
        placeholder="Username" 
        onChange={handleChange} 
        required 
      />
      <input 
        name="email" 
        placeholder="Email" 
        type="email" 
        onChange={handleChange} 
        required 
      />
      <input 
        name="password" 
        placeholder="Password" 
        type="password" 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Register</button>
    </form>

    <hr />

    <button onClick={handleGoogleRegister} className="google-btn">
      Continue with Google
    </button>

    <p>
      Already registered? <Link to="/login">Login here</Link>
    </p>
  </div>
);

}
