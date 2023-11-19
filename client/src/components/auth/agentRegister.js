import React, { useState } from "react";
import axios from "axios";

function AgentRegister() {
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
      alert(res.data.msg);
    } catch (error) {
      console.log("Error adding new agent", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={addNewAgent} className="newAgentForm">
        <label>Company Name:</label>
        <input
          type="text"
          value={newAgent.companyName}
          onChange={handleInputChange}
          name="companyName"
        />
        <label>Contact Person:</label>
        <input
          type="text"
          value={newAgent.contactPerson}
          onChange={handleInputChange}
          name="contactPerson"
        />
        <label>Email:</label>
        <input
          type="text"
          value={newAgent.email}
          onChange={handleInputChange}
          name="email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={newAgent.password}
          onChange={handleInputChange}
          name="password"
        />
        <label>Phone number:</label>
        <input
          type="text"
          value={newAgent.phoneNumber}
          onChange={handleInputChange}
          name="phoneNumber"
        />
        <label>Agency Description:</label>
        <input
          type="text"
          value={newAgent.agencyDescription}
          onChange={handleInputChange}
          name="agencyDescription"
        />

        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
}

export default AgentRegister;
