import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyCard from "./components/propertyCard";
import PropertyGrid from "./components/propertyGrid";
import NewPropertyForm from "./components/newPropertyForm";
import axios from "axios";
import AgencyGrid from "./components/agencyGrid";
import EditProperty from "./components/editPropertyForm";
import NavBar from "./components/navBar";
import PropertyDetails from "./components/propertyDetails";
import UserLogin from "./components/auth/userLogin";
import AgentLogin from "./components/auth/agentLogin";
import UserRegister from "./components/auth/userRegister";
import AgentRegister from "./components/auth/agentRegister";
function App() {
  const [properties, setProperties] = useState([]);

  async function getAllProperties() {
    try {
      const res = await axios.get("http://localhost:8000");
      setProperties(res.data);
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
        getAllProperties();
      } catch (error) {
        console.error("Error deleting the property", error);
      }
    }
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className="divider-line"></div>
      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/agent-login" element={<AgentLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/agent-register" element={<AgentRegister />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route
          path="/new-property-form"
          element={
            <>
              <NewPropertyForm getAllProperties={getAllProperties} />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <PropertyGrid
                getAllProperties={getAllProperties}
                properties={properties}
              />
            </>
          }
        />

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
