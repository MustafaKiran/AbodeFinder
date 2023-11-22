import React, { useState} from "react";

import { Link} from "react-router-dom";

const PropertyCard = ({ property, getAllProperties }) => {
  
  const [editing, setEditing] = useState(false);
  
  

  return (
    <div>
      <div className="propertyCard">
        <h1>{property.title}</h1>
        <h2>{property.rentAmount}</h2>
        <h2> {property.livingSpace} </h2>
        <h2>{property.bedrooms}</h2>
        <h2> {property.availableDate.split('T')[0]} </h2>
        <h2>{property.owner.companyName}</h2>
        <Link to={`/property/${property._id}`}>View Details</Link>
      </div>
      
      
    </div>
  );
};

export default PropertyCard;
