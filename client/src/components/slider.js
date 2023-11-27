import React from "react";
import "./slider.css"

function Slider({each, getAllProperties}) {
  return (
    <div className="sliderEach" >
      <img src={each.photoURL} alt={`Photo of ${each.title}`} />
    </div>
  );
}

export default Slider;
