import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import orange from "../../assets/orange.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function UserLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("https://abode-finder-api.onrender.com/login-user", {
        userName,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid username or password. Please check your credentials.");
      } else {
        alert("Log in failed. Please try again later.");
      }
    }
  }

  return (
    <div className="loginFormContainer">
      <div className="loginPhoto">
        <img src={orange} className="orange" />
      </div>
      <form onSubmit={handleLogin} className="loginForm">
        <h2>Hello Again!</h2>

        <input
          placeholder="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="passContainer">
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <button type="submit">Log in</button>
        <div>
          <Link to="/user-register" className="link">
            New here? Sign up for free!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
