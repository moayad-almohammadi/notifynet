import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import vendorRoutes from "./routes/vendors.js"; // Import the vendor routes

const app = express();
const mongoURI = "mongodb://localhost:27017/notifynet"; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Apply the CORS middleware
app.use(cors()); // Add this line to enable CORS

// Middleware to parse JSON
app.use(express.json());

// Use the vendor routes
app.use("/api/vendors", vendorRoutes);

export default app;
