const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  agencyDescription: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "agent"
  }

});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
