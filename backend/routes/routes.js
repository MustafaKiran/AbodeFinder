const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/controllers");

router.get("/", getAllProperties);
router.post("/create", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
