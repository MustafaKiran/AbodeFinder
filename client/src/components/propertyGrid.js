import PropertyCard from "./propertyCard";


const PropertyGrid = ({ properties, getAllProperties }) => {
  
  
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} getAllProperties={getAllProperties}/>
      ))}
    </div>
  );
};

export default PropertyGrid;
