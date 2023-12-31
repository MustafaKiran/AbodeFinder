const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication")
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/controllers");

router.get("/", getAllProperties);
router.post("/create",verifyToken, createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.get("/:id", getPropertyById);

module.exports = router;
