import PropertyCard from "./propertyCard";

const AgencyGrid = ({ properties, deleteProperty }) => {
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} deleteProperty={deleteProperty} />
      ))}
    </div>
  );
};

export default AgencyGrid;
