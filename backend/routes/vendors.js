// routes/vendors.js
import express from "express";
import Vendor from "../models/Vendor.js"; // Import the Mongoose model

const router = express.Router();

// Route to get all vendors with their alerts
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find(); // Fetch all vendors from the database
    res.json(vendors); // Send the vendors as JSON response
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get a specific vendor by name
router.get("/:name", async (req, res) => {
  try {
    const vendorName = req.params.name;
    const vendor = await Vendor.findOne({ vendor: vendorName }); // Fetch a specific vendor
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
