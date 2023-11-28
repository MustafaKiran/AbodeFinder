import React from "react";
import { Link } from "react-router-dom";
import "./slider.css"

function Slider({each, getAllProperties}) {
    let token = localStorage.getItem("token");
  return (
    <Link to= { token? `/property/${each._id}` : "/user-register"} className="sliderEach">
      <img src={each.photoURL} alt={`Photo of ${each.title}`} />
      <div className="subSlide" >
      <h4>{each.address} </h4>
      <h4>{each.rentAmount} € </h4>
      </div>
      
      
    </Link>
  );
}

export default Slider;
