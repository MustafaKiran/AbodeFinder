import useState from "react";
import axios from "axios"



const NewPropertyForm = ({ properties, getAllProperties }) => {
  const [newProperty, setNewProperty] = useState({
    title: "",
    rentAmount: "",
    livingSpace: "",
    bedrooms: "",
    availableDate: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewProperty({ ...newProperty, [e.target.name]: value });
  };

  async function addNewProperty(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/create", newProperty);
      await getAllProperties();
    } catch (error) {
      console.log("Error adding new property", error);
    }
  }

  return (
    <div className="newPropertyFormContainer">
      <form
        onSubmit={(e) => {
          addNewProperty(e);
        }}
        className="newPropertyForm"
      >
        <label>Title:</label>
        <input
          type="text"
          value={newProperty.title}
          onChange={handleInputChange}
          name="title"
        />
        <label>Rent:</label>
        <input
          type="number"
          value={newProperty.rentAmount}
          onChange={handleInputChange}
          name="rentAmount"
        />
        <label>Living space:</label>
        <input
          type="number"
          value={newProperty.livingSpace}
          onChange={handleInputChange}
          name="livingSpace"
        />
        <label>Number of Bedrooms:</label>
        <input
          type="number"
          value={newProperty.bedrooms}
          onChange={handleInputChange}
          name="bedrooms"
        />
        <label>Vacant from:</label>
        <input
          type="date"
          value={newProperty.availableDate}
          onChange={handleInputChange}
          name="availableDate"
        />
      </form>
    </div>
  );
};

export default NewPropertyForm;
