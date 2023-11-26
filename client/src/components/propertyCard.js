import React, { useState } from "react";
import { Link } from "react-router-dom";
import rent from "../assets/cash-payment.png";
import area from "../assets/measure.png";
import room from "../assets/double-bed.png";
import address from "../assets/room.png"

const PropertyCard = ({ property, getAllProperties }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="propertyCardContainer">
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

        <h2>Vacant from: {property.availableDate.split("T")[0]} </h2>
        <h3>Owner: {property.owner.companyName}</h3>

        <Link to={`/property/${property._id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default PropertyCard;
