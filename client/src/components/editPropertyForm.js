import { useState } from "react";
import axios from "axios";
import "./editPropertyForm.css"
function EditProperty({ property, getAllProperties, setEditing }) {
  const [editedProperty, setEditedProperty] = useState({
    title: property.title,
    rentAmount: property.rentAmount,
    livingSpace: property.livingSpace,
    bedrooms: property.bedrooms,
    availableDate: property.availableDate,
    // photoURL: property.photoURL,
  });
  console.log(property);
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
      // const trimmedPhotoURL = editedProperty.photoURL.trim()    || !trimmedPhotoURL
      if (
        !trimmedTitle ||
        !trimmedRentAmount ||
        !trimmedLivingSpace ||
        !trimmedBedrooms ||
        !trimmedAvailableDate
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      await axios.put(`http://localhost:8000/${property._id}`, {
        title: trimmedTitle,
        rentAmount: trimmedRentAmount,
        livingSpace: trimmedLivingSpace,
        bedrooms: trimmedBedrooms,
        availableDate: trimmedAvailableDate,
        // photoURL:trimmedPhotoURL,
      });
      setEditedProperty({
        title: "",
        rentAmount: "",
        livingSpace: "",
        bedrooms: "",
        availableDate: "",
      });

      setEditing(false);
      if (typeof getAllProperties === "function") {
        getAllProperties();
      }
    } catch (error) {
      console.error("Error updating the property", error);
    }
  }

  return (
    <div className="updatePropertyFormContainer" >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProperty();
        }}
        className="updatePropertyForm"
      >
        <h3>Update Your Property Details</h3>
        <label>Title:</label>
        <input
        className="newTitle"
          type="text"
          value={editedProperty.title}
          onChange={handleUpdate}
          name="title"
        />
        <label>Rent:</label>
        <input
        className="newRent"
          type="number"
          value={editedProperty.rentAmount}
          onChange={handleUpdate}
          name="rentAmount"
        />
        <label>Living space:</label>
        <input
        className="newArea"
          type="number"
          value={editedProperty.livingSpace}
          onChange={handleUpdate}
          name="livingSpace"
        />
        <label>Number of Bedrooms:</label>
        <input
        className="newRooms"
          type="number"
          value={editedProperty.bedrooms}
          onChange={handleUpdate}
          name="bedrooms"
        />
        <label>Vacant from:</label>
        <input
        id="updateDate"
          type="date"
          value={editedProperty.availableDate}
          onChange={handleUpdate}
          name="availableDate"
        />
        {/* <label>Photo:</label>
        <input type="file" onChange={handleFileChange} accept="image/jpeg, image/png, image/gif" /> */}
        <button onClick={updateProperty}>Save</button>
      </form>
      
    </div>
  );
}

export default EditProperty;
