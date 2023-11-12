import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyCard from "./components/propertyCard";
import PropertyGrid from "./components/propertyGrid";
import newPropertyForm from "./components/newPropertyForm";
import axios from "axios";

function App() {
  const [properties, setProperties] = useState([]);

  async function getAllProperties() {
    try {
      const res = await axios.get("http://localhost:8000");
      setProperties(res.data);
      console.log(properties);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  }

  useEffect(() => {
    getAllProperties();
  }, []);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
