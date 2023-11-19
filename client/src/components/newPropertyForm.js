import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPropertyForm = ({ getAllProperties }) => {

  const navigate = useNavigate();

  const [newProperty, setNewProperty] = useState({
    title: "",
    rentAmount: "",
    livingSpace: "",
    bedrooms: "",
    availableDate: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewProperty({ ...newProperty, [e.target.name]: value });
  };

  async function addNewProperty(e) {
    e.preventDefault();
    for (const key in newProperty) {
      if (newProperty[key].trim() === "") {
        alert("Please fill in all required fields.");
        return;
      }
    }
    try {
      await axios.post("http://localhost:8000/create", newProperty);
      await getAllProperties();
      navigate("/agency-dashboard")
    } catch (error) {
      console.log("Error adding new property", error);
    }
  }

  return (
    <div className="newPropertyFormContainer">
      <form
        onSubmit={(e) => {
          addNewProperty(e);
        }}
        className="newPropertyForm"
      >
        <label>Title:</label>
        <input
          type="text"
          value={newProperty.title}
          onChange={handleInputChange}
          name="title"
        />
        <label>Rent:</label>
        <input
          type="number"
          value={newProperty.rentAmount}
          onChange={handleInputChange}
          name="rentAmount"
        />
        <label>Living space:</label>
        <input
          type="number"
          value={newProperty.livingSpace}
          onChange={handleInputChange}
          name="livingSpace"
        />
        <label>Number of Bedrooms:</label>
        <input
          type="number"
          value={newProperty.bedrooms}
          onChange={handleInputChange}
          name="bedrooms"
        />
        <label>Vacant from:</label>
        <input
          type="date"
          value={newProperty.availableDate.split("T")[0]}
          onChange={handleInputChange}
          name="availableDate"
        />
      </form>
      <button onClick={addNewProperty}>Create</button>
    </div>
  );
};

export default NewPropertyForm;
