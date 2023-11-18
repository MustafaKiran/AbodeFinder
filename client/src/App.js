import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyCard from "./components/propertyCard";
import PropertyGrid from "./components/propertyGrid";
import NewPropertyForm from "./components/newPropertyForm";
import axios from "axios";
import AgencyGrid from "./components/agencyGrid";
import EditProperty from "./components/editPropertyForm";

function App() {
  const [properties, setProperties] = useState([]);

  

  async function getAllProperties() {
    try {
      const res = await axios.get("http://localhost:8000");
      setProperties(res.data);
      // console.log(properties);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  }

  useEffect(() => {
    getAllProperties();
  }, []);

  async function deleteProperty(id) {
    const alertDeleteProperty = window.confirm("Sure?");
    if (alertDeleteProperty) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        await getAllProperties();
      } catch (error) {
        console.error("Error deleting the property", error);
      }
    }
  }

  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/properties"
          element={
            <PropertyGrid
              properties={properties}
              getAllProperties={getAllProperties}
            />
          }
        />
        <Route
          path="/new-property-form"
          element={<NewPropertyForm getAllProperties={getAllProperties} />}
        />
        {/* <Route
          path="/edit-property"
          element={<EditProperty getAllProperties={getAllProperties}  />}
        /> */}

        <Route
          path="/agency-dashboard"
          element={
            <>
            <AgencyGrid
              getAllProperties={getAllProperties}
              properties={properties}
              deleteProperty={deleteProperty}
            />
            </>
            
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
