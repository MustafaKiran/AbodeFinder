const Property = require("../models/propertyModel");

const getAllProperties = async (req, res) => {
  try {
    const allProperties = await Property.find().populate(
      "owner",
      "companyName"
    );
    res.status(200).send(allProperties);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve the properties." });
  }
};

const getPropertyById = async (req, res) => {
  try {
    // populate the company name
    const property = await Property.findById(req.params.id).populate({
      path: "owner",
      select: "companyName contactPerson email phoneNumber agencyDescription",
    });
    if (!property) {
      return res.status(404).send({ error: "Property not found." });
    }
    res.status(200).send(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).send({ error: "Failed to retrieve the property." });
  }
};

const createProperty = async (req, res) => {
  try {
    // add owner to created properties
    const owner = req.user.id;
    const newProperty = { ...req.body, owner };

    const createdProperty = await Property.create(newProperty);
    res.status(201).send(createdProperty);
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
  getPropertyById,
};
