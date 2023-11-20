import PropertyCard from "./propertyCard";

const AgencyGrid = ({ properties , getAllProperties,deleteProperty}) => {
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} getAllProperties={getAllProperties} deleteProperty={deleteProperty}/>
      ))}
    </div>
  );
};

export default AgencyGrid;
