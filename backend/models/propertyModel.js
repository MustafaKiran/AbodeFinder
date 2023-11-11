const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  livingSpace: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  availableDate: {
    type: Date,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
