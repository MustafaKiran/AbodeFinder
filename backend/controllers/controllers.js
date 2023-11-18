const Property = require("../models/propertyModel");
const User = require("../models/userModel");

const getAllProperties = async (req, res) => {
  try {
    const allProperties = await Property.find();
    res.status(200).send(allProperties);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve the properties." });
  }
};

const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).send(newProperty);
  } catch (error) {
    res.status(500).send({ error: "Failed to create the property." });
  }
};

const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).send({ error: "New property not found." });
    }
    res.status(200).send(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send({ error: "Failed to update the property." });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).send({ error: "Property not found" });
    }
    res.status(200).send({ msg: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting the property", error);
    res.status(500).send({ error: "Failed to delete the property" });
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};
