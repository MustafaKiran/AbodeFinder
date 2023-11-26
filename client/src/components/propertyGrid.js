import PropertyCard from "./propertyCard";
import "./home.css"
const PropertyGrid = ({ properties, getAllProperties }) => {
  
  
  return (
    <div className="propertyGrid" >
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} getAllProperties={getAllProperties}/>
      ))}
    </div>
  );
};

export default PropertyGrid;
