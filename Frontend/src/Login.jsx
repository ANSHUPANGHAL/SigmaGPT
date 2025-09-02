import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Agar user already login hai to direct chat pe bhej do
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      
      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ 
        userId: res.data.userId, 
        username: res.data.username 
      }));

      navigate("/chat"); // ✅ successful login → chat window
    } catch (err) {
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
  <div className="login-container">
    <h2>Login SigmaGPT</h2>

    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>

    <p>
      Not registered? <Link to="/register">Sign up here</Link>
    </p>
  </div>
);
}
