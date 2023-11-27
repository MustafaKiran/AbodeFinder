import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import orange from "../../assets/agentlog1.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function AgentLogin() {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login-agent", {
        companyName,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

        navigate("/agency-dashboard");
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert(
          "Invalid company name or password. Please check your credentials."
        );
      } else {
        alert("Log in failed. Please try again later.");
      }
    }
  }

  return (
    <div className="loginFormContainer">
      <div className="loginPhoto">
        <img src={orange} className="orangeAgent" />
      </div>
      <form onSubmit={handleLogin} className="loginForm">
        <h2>Welcome back!</h2>

        <input
          placeholder="Company name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
          <Link to="/agent-register" className="link">
            New here? Sign up for free!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AgentLogin;
