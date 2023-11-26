import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./newPropertyForm.css"

const NewPropertyForm = ({ getAllProperties }) => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [newProperty, setNewProperty] = useState({
    title: "",
    rentAmount: "",
    livingSpace: "",
    bedrooms: "",
    availableDate: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewProperty({
      ...newProperty,
      [e.target.name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Check if the selected file is an image (JPEG, PNG, or GIF)
    if (file && isImageFile(file)) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image file (JPEG, PNG, or GIF).");
    }
  };

  const isImageFile = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
    return acceptedTypes.includes(file.type);
  };

  async function addNewProperty(e) {
    e.preventDefault();

    for (const key in newProperty) {
      if (newProperty[key].trim() === "") {
        alert("Please fill in all required fields.");
        return;
      }
    }

    if (!selectedFile) {
      alert("Please select a valid image file (JPEG, PNG, or GIF).");
      return;
    }

    try {
      const fileRef = ref(storage, `${v4()}`);
      await uploadBytes(fileRef, selectedFile);

      const fileURL = await getDownloadURL(fileRef);

      const propertyWithFile = { ...newProperty, photoURL: fileURL };

      await axios.post("http://localhost:8000/create", propertyWithFile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await getAllProperties();

      navigate("/agency-dashboard");
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
        <h3>Tell Us About Your Property</h3>
        <label>Title:</label>
        <input
        placeholder="e.g., Spacious flat in the city center "
          className="newTitle"
          type="text"
          value={newProperty.title}
          onChange={handleInputChange}
          name="title"
        />
        <label>Rent:</label>
        <input
        placeholder="€ per month "
        className="newRent"
          type="number"
          value={newProperty.rentAmount}
          onChange={handleInputChange}
          name="rentAmount"
        />
        <label>Living space:</label>
        <input
        placeholder="m²"
        className="newArea"
          type="number"
          value={newProperty.livingSpace}
          onChange={handleInputChange}
          name="livingSpace"
        />
        <label>Number of Bedrooms:</label>
        <input
        placeholder="Excluding the living room!"
        className="newRooms"
          type="number"
          value={newProperty.bedrooms}
          onChange={handleInputChange}
          name="bedrooms"
        />
        <label>Vacant from:</label>
        <input
        id="newDate"
          type="date"
          value={newProperty.availableDate}
          onChange={handleInputChange}
          name="availableDate"
        />
        <label>Photo:</label>
        <input
        className="newPhoto"
          type="file"
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/gif"
        />
        <button onClick={addNewProperty}>Post</button>
      </form>
      
    </div>
  );
};

export default NewPropertyForm;
