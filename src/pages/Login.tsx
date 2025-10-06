import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("username:", username, "Password:", password);
    // Add login logic here (API call, validation, etc.)
    
    const fetchUserData = async () => {
      const apiurl = import.meta.env.VITE_API_URL;

      try {

        const response = await fetch(`${apiurl}/api/method/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ usr: username, pwd: password }),
          credentials: "include",
        });

        if (response.ok) {

          console.log("response ok");
          console.log("login successful");
          console.log("response all;", response);
          const res = await fetch(`${apiurl}/api/method/frappe.auth.get_logged_user`, {
            credentials: 'include'
          });
          const user = await res.json();
          console.log("user", user);



          navigate('/add-item');
        } else {
          console.log("login failed");
        }
        const data = await response.json();

        console.log("response", data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label htmlFor="email">username</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
