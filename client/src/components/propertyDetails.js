import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <img
          src={details.photoURL}
          alt={`Photo of ${property.title}`}
         
        />
      <h1>{details.title}</h1>
      <h2>{details.rentAmount}</h2>
      <h2> {details.livingSpace} </h2>
      <h2>{details.bedrooms}</h2>
      <h2>{details?.availableDate?.split('T')[0]}</h2>
    </div>
  );
}

export default PropertyDetails;
