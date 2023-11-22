import React, { useState} from "react";
import EditProperty from "./editPropertyForm";
import { Link} from "react-router-dom";

const AgencyCard = ({ property, deleteProperty, getAllProperties }) => {
  
  const [editing, setEditing] = useState(false);
  
  const handleDelete = () => {
    if (deleteProperty) {
      deleteProperty(property._id);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div>
      <div className="propertyCard">
        <h1>{property.title}</h1>
        <h2>{property.rentAmount}</h2>
        <h2> {property.livingSpace} </h2>
        <h2>{property.bedrooms}</h2>
        <h2> {property.availableDate.split('T')[0]} </h2>
        <h2>{property.owner.companyName}</h2>
        <img
            src={property.photoURL}
            alt={`Photo of ${property.title}`}
            style={{ maxWidth: "200px", height: "auto" }}
          />
        <Link to={`/property/${property._id}`}>View Details</Link>
      </div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      {editing && (
        <EditProperty
          property={property}
          setEditing={setEditing}
          getAllProperties={getAllProperties}
        />
      )}
    </div>
  );
};

export default AgencyCard;
