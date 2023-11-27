import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./propertyDetails.css"
function PropertyDetails(property) {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  //    Render the details of a single property
  

  useEffect(() => {
    async function getProperty() {
      try {
        const res = await axios.get(`http://localhost:8000/${id}`);
        setDetails(res.data);
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    }
    getProperty();
  }, []);

  return (
    <div className="propertyDetailsContainer" >
      <div className="propertyImages" >
      <img
          src={details.photoURL}
          alt={`Photo of ${property.title}`}
         
        />
      </div>
      <div className="propertyDetails">
      <h1>{details.title}</h1>
      <h2>Address: {details.address}</h2>
      <h2>Rent per month: {details.rentAmount}</h2>
      <h2>Living Space: {details.livingSpace} </h2>
      <h2>Number of bedrooms: {details.bedrooms}</h2>
      <h2>Vacant from:  {details?.availableDate?.split('T')[0]}</h2>
      </div>
      
    </div>
  );
}

export default PropertyDetails;
