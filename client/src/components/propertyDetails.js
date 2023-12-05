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
        const res = await axios.get(`https://abode-finder-api.onrender.com/${id}`);
        setDetails(res.data);
        
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    }
    getProperty();
    // console.log(details)
  }, []);

  return (
    <div className="propertyDetailsContainer" >
      <div className="allDetails" >
      <div className="propertyImages" >
      <img
          src={details.photoURL}
          alt={`Photo of ${property.title}`}
         
        />
      </div>
      
      <div className="propertyDetails">
      <h1>{details.title}</h1>
      <h3>Address: {details.address}</h3>
      <h3>Rent per month: {details.rentAmount} €</h3>
      <h3>Living Space: {details.livingSpace} m²</h3>
      <h3>Number of bedrooms: {details.bedrooms}</h3>
      <h3>Vacant from:  {details?.availableDate?.split('T')[0]}</h3>
      </div>
      </div>
      <div className="companyInfo" >
        <h2>Rented by: {details?.owner?.companyName} </h2>
        <h4>{details?.owner?.agencyDescription}</h4>
        <h4> Phone number: {details?.owner?.phoneNumber}</h4>
        <h4>Email:  {details?.owner?.email}</h4>

      </div>
      
      
    </div>
  );
}

export default PropertyDetails;
