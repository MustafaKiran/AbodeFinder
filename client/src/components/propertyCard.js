import React, { useState } from "react";
import { Link } from "react-router-dom";
import rent from "../assets/cash-payment.png";
import area from "../assets/measure.png";
import room from "../assets/double-bed.png";
import address from "../assets/room.png";

const PropertyCard = ({ property, getAllProperties }) => {
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("token");
  return (
    <div className="propertyCardContainer">
      <div className="propertyImg">
        <img src={property.photoURL} alt={`Photo of ${property.title}`} />
      </div>
      <div className="propertyCardDetails">
        <h1 className="title">{property.title}</h1>
        <div className="address">
          <img src={address} />
          <h2>{property.address}</h2>
        </div>
        <div className="keyDetails">
          <div className="detail">
            <img src={rent} />
            <h2>{property.rentAmount} €</h2>
          </div>
          <div className="detail">
            <img src={area} />
            <h2>{property.livingSpace} m² </h2>
          </div>
          <div className="detail">
            <img src={room} />
            <h2>{property.bedrooms} bedrooms</h2>
          </div>
        </div>
        <div className="companyDetails" >
        <h3>{property.owner.companyName}</h3>
        {token && (
        <Link to={`/property/${property._id}`}>View details</Link>)}
        </div>
        
        
      </div>
    </div>
  );
};

export default PropertyCard;
