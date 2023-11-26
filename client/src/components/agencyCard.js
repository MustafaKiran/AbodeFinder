import React, { useState } from "react";
import EditProperty from "./editPropertyForm";
import { Link } from "react-router-dom";
import rent from "../assets/cash-payment.png";
import area from "../assets/measure.png";
import room from "../assets/double-bed.png";
import address from "../assets/room.png";
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
    <div className="agencyCardContainer">
      <div className="propertyImg">
        <img src={property.photoURL} alt={`Photo of ${property.title}`} />
      </div>
      <div className="propertyCardDetails">
        <h1 className="title">{property.title}</h1>
        <div className="address">
          <img src={address} />
          <h2>Amsterdam, Noord Holland</h2>
        </div>
        <div className="keyDetails">
          <div className="detail">
            <img src={rent} />
            <h2>{property.rentAmount} €</h2>
          </div>
          <div className="detail">
            <img src={area} />
            <h2>{property.livingSpace}m² </h2>
          </div>
          <div className="detail">
            <img src={room} />
            <h2>{property.bedrooms} bedrooms</h2>
          </div>
        </div>

        <Link to={`/property/${property._id}`}>View Details</Link>
      </div>
      <div className="cardButtons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
      <div className="editingCard">
        {editing && (
          <EditProperty
            property={property}
            setEditing={setEditing}
            getAllProperties={getAllProperties}
          />
        )}
      </div>
    </div>
  );
};

export default AgencyCard;
