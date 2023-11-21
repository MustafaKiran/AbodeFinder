import { useState } from "react";
import axios from "axios";

function EditProperty({  property, getAllProperties, setEditing }) {
  const [editedProperty, setEditedProperty] = useState({
    title: property.title ,
    rentAmount: property.rentAmount,
    livingSpace: property.livingSpace,
    bedrooms: property.bedrooms ,
    availableDate: property.availableDate,
  });
  console.log(property)
  const handleUpdate = (e) => {
    const value = e.target.value;
    setEditedProperty({ ...editedProperty, [e.target.name]: value });
  };

  async function updateProperty() {
    try {
       // Validation for empty or blank space entry
    const trimmedTitle = editedProperty.title.trim();
    const trimmedRentAmount = editedProperty.rentAmount.toString().trim();
    const trimmedLivingSpace = editedProperty.livingSpace.toString().trim();
    const trimmedBedrooms = editedProperty.bedrooms.toString().trim();
    const trimmedAvailableDate = editedProperty.availableDate.trim();

    if (!trimmedTitle || !trimmedRentAmount || !trimmedLivingSpace || !trimmedBedrooms || !trimmedAvailableDate) {
      alert("Please fill in all required fields.");
      return;
    }

    await axios.put(`http://localhost:8000/${property._id}`, {
      title: trimmedTitle,
      rentAmount: trimmedRentAmount,
      livingSpace: trimmedLivingSpace,
      bedrooms: trimmedBedrooms,
      availableDate: trimmedAvailableDate,
    });
      setEditedProperty({
        
        title: "",
        rentAmount: "",
        livingSpace: "",
        bedrooms: "",
        availableDate: "",
      });
      
      setEditing(false);
      if (typeof getAllProperties === 'function') {
        getAllProperties(); 
      }
      
    } catch (error) {
      console.error("Error updating the property", error);
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProperty();
        }}
        className="updatePropertyForm"
      >
        <label>Title:</label>
        <input
          type="text"
          value={editedProperty.title}
          onChange={handleUpdate}
          name="title"
        />
        <label>Rent:</label>
        <input
          type="number"
          value={editedProperty.rentAmount}
          onChange={handleUpdate}
          name="rentAmount"
        />
        <label>Living space:</label>
        <input
          type="number"
          value={editedProperty.livingSpace}
          onChange={handleUpdate}
          name="livingSpace"
        />
        <label>Number of Bedrooms:</label>
        <input
          type="number"
          value={editedProperty.bedrooms}
          onChange={handleUpdate}
          name="bedrooms"
        />
        <label>Vacant from:</label>
        <input
          type="date"
          value={editedProperty.availableDate}
          onChange={handleUpdate}
          name="availableDate"
        />
      </form>
      <button onClick={updateProperty}>Save</button>
    </div>
  );
}

export default EditProperty;
