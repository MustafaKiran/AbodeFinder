import AgencyCard from "./agencyCard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AgencyGrid = ({ properties, getAllProperties, deleteProperty }) => {
  const [ownerIds, setOwnerIds] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filterPropertiesByOwner() {
        // filter the ones with matching id and then map the ids only
        const updatedOwnerIds = properties
          .filter((p) => p.owner._id === decoded.id)
          .map((p) => p._id);
        setOwnerIds(updatedOwnerIds);
      }
      filterPropertiesByOwner();
    }
  }, [properties]);

  return (
    <div className="propertyGrid">
      <div >
        <h1>{decoded.companyName} Dashboard </h1>
        <h3>Take a look at your properties</h3>
      </div>
      {properties
        .filter((p) => ownerIds.includes(p._id))
        .map((property) => (
          <AgencyCard
            key={property._id}
            property={property}
            getAllProperties={getAllProperties}
            deleteProperty={deleteProperty}
          />
        ))}
    </div>
  );
};

export default AgencyGrid;
