import React, { useState } from "react";
import EditProperty from "./editPropertyForm";
import { Link } from "react-router-dom";
import rent from "../assets/cash-payment.png";
import area from "../assets/measure.png";
import room from "../assets/double-bed.png";
import address from "../assets/room.png";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./agency-dashboard.css";
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
          <h2>{property.address} Amsterdam, Noord Holland</h2>
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
        <div className="cardButtons">
        <button onClick={handleDelete}>
          <h1>
            <DeleteForeverIcon />
          </h1>
        </button >
        <button id="editButton"  onClick={handleEdit}>
          <h1>
            <ModeEditIcon />
          </h1>
        </button>
      </div>

       
      </div>
      
      <div className={`editingOverlay ${editing ? "active" : ""}`}>
        <div className="editingWindow">
          <EditProperty
            property={property}
            setEditing={setEditing}
            getAllProperties={getAllProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyCard;
