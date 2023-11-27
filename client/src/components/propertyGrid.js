import PropertyCard from "./propertyCard";
import Slider from "./slider";
import "./home.css"
const PropertyGrid = ({ properties, getAllProperties }) => {
  
  return (
    <div>
      <div className="sliderContainer" >
        <div className="slideBand" >
        {properties.map((each,index)=>(
          
          <Slider key={index} each={each} getAllProperties={getAllProperties} />
        ))}
        </div>
        
       
      </div>
    <div className="propertyGrid" >
      
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} getAllProperties={getAllProperties}/>
      ))}
    </div>
    </div>
  );
};

export default PropertyGrid;
