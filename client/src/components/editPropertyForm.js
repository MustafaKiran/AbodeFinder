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
      await axios.put(`http://localhost:8000/${property._id}`, {
        title: editedProperty.title,
        rentAmount: editedProperty.rentAmount,
        livingSpace: editedProperty.livingSpace,
        bedrooms: editedProperty.bedrooms,
        availableDate: editedProperty.availableDate.split("T")[0],
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
          value={editedProperty.availableDate.split("T")[0]}
          onChange={handleUpdate}
          name="availableDate"
        />
      </form>
      <button onClick={updateProperty}>Save</button>
    </div>
  );
}

export default EditProperty;
