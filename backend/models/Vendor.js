import mongoose from "mongoose";

// Define the schema for the alert
const alertSchema = new mongoose.Schema({
  id: Number,
  href: String,
  title: String,
  description: String,
  date: String,
});

// Define the schema for the vendor
const vendorSchema = new mongoose.Schema({
  vendor: String,
  alert: [alertSchema], // An array of alerts
});

// Create a model for the vendor
const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
