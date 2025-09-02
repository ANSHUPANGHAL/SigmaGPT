import API from "./api";

// Register
export const register = async (email, password) => {
  const res = await API.post("/auth/register", { email, password });
  return res.data;
};

// Login
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  
  // Token save in localStorage
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
