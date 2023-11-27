import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import orange from "../../assets/agentlog1.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function AgentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [newAgent, setNewAgent] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    password: "",
    phoneNumber: "",
    agencyDescription: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewAgent({ ...newAgent, [e.target.name]: value });
  };

  async function addNewAgent(e) {
    e.preventDefault();

    // Basic form validation
    if (
      !newAgent.companyName.trim() ||
      !newAgent.contactPerson.trim() ||
      !newAgent.email.trim() ||
      !newAgent.password.trim() ||
      !newAgent.phoneNumber.trim() ||
      !newAgent.agencyDescription.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      let res = await axios.post(
        "http://localhost:8000/register-agent",
        newAgent
      );
      navigate("/agent-login");
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
      console.log("Error adding new agent", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="loginFormContainer">
      <div className="loginPhoto">
        <img src={orange} className="orangeAgent" />
      </div>
      <form onSubmit={addNewAgent} className="newAgentForm">
        <h2>Empower Your Listings: <br/> Join as an Agent</h2>
        <div className="signUpDetails"  >
          <input
            placeholder="Email"
            type="text"
            value={newAgent.email}
            onChange={handleInputChange}
            name="email"
          />
          <div className="passContainer">
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={newAgent.password}
            onChange={handleInputChange}
            name="password"
          />
          <span onMouseDown={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        </div>
        <div  className="signUpDetails">
          <input
            placeholder="Company Name"
            type="text"
            value={newAgent.companyName}
            onChange={handleInputChange}
            name="companyName"
          />
          <input
            placeholder="Contact Person"
            type="text"
            value={newAgent.contactPerson}
            onChange={handleInputChange}
            name="contactPerson"
          />
        </div>
        <div  className="signUpDetails" >
          <textarea
          id="agencyDescription"
            placeholder="Agency Description"
            type="text"
            value={newAgent.agencyDescription}
            onChange={handleInputChange}
            name="agencyDescription"
          />
          <input
            placeholder="Phone number"
            type="text"
            value={newAgent.phoneNumber}
            onChange={handleInputChange}
            name="phoneNumber"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
}

export default AgentRegister;
