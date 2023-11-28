const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const Agent = require("../models/agentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    let { userName, email, password, phoneNumber } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).send({ msg: "You need to fill all the fields." });
    }
    // Check if the username is already taken
    let userFound = await User.findOne({ userName });
    if (userFound) {
      return res.status(400).send({
        msg: "This username is already taken. Please register with a different username.",
      });
    }
    // Check if the email is already in use
    let emailFound = await User.findOne({ email });
    if (emailFound) {
      return res.status(400).send({
        msg: "This email is already in use. Please register with a different email.",
      });
    }
    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    await User.create({ userName, email, password: hashPassword, phoneNumber });
    return res.status(200).send({ msg: "Registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Validation
    if (!userName || !password) {
      return res
        .status(400)
        .send({ msg: "Both username and password are required." });
    }

    // Check if the user exists
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      // Check password
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password." });
      } else {
        // Generate and send token on successful login
        const token = jwt.sign(
          {
            type: existingUser.type,
            userName: existingUser.userName,
            id: existingUser._id,
          },
          process.env.PRIVATE_KEY,
          { expiresIn: "3h" }
        );
        return res.status(200).send({ msg: "Logged in successfully.", token });
      }
    } else {
      return res.status(404).send({ msg: "Invalid username." });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ msg: "Internal server error. Login failed." });
  }
};

const registerAgent = async (req, res) => {
  try {
    let {
      companyName,
      email,
      password,
      phoneNumber,
      contactPerson,
      agencyDescription,
    } = req.body;
    if (
      !companyName ||
      !email ||
      !password ||
      !phoneNumber ||
      !contactPerson ||
      !agencyDescription
    ) {
      return res.status(400).send({ msg: "You need to fill all the fields." });
    }
    // Check if the company name is already taken
    let companyFound = await Agent.findOne({ companyName });
    if (companyFound) {
      return res.status(400).send({
        msg: "This company name is already taken. Please register with a different company name.",
      });
    }
    // Check if the email is already in use
    let emailFound = await Agent.findOne({ email });
    if (emailFound) {
      return res.status(400).send({
        msg: "This email is already in use. Please register with a different email.",
      });
    }
    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    await Agent.create({
      companyName,
      email,
      password: hashPassword,
      phoneNumber,
      contactPerson,
      agencyDescription,
    });
    return res.status(200).send({ msg: "Registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error." });
  }
};

const loginAgent = async (req, res) => {
  try {
    const { companyName, password } = req.body;

    // Validation
    if (!companyName || !password) {
      return res
        .status(400)
        .send({ msg: "Both company name and password are required." });
    }

    // Check if the agent (company) exists
    const existingAgent = await Agent.findOne({ companyName });

    if (existingAgent) {
      // Check password
      const validPassword = await bcrypt.compare(
        password,
        existingAgent.password
      );

      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password." });
      } else {
        // Generate and send token on successful login
        const token = jwt.sign(
          {
            type: existingAgent.type,
            companyName: existingAgent.companyName,
            id: existingAgent._id,
            contactPerson: existingAgent.contactPerson,
            email: existingAgent.email,
            phoneNumber: existingAgent.phoneNumber,
            agencyDescription: existingAgent.agencyDescription,
          },
          process.env.PRIVATE_KEY,
          { expiresIn: "3h" }
        );
        return res.status(200).send({ msg: "Logged in successfully.", token });
      }
    } else {
      return res.status(404).send({ msg: "Invalid company name." });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ msg: "Internal server error. Login failed." });
  }
};

module.exports = { registerUser, registerAgent, loginUser, loginAgent };
