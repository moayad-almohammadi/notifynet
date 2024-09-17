import { scrapePageContent } from "./scrape.js";
import { anaylzyWebContent } from "./googleAIAnalyzer.js";
import mongoose from "mongoose";
import Vendor from "./models/Vendor.js";

// Define the web page to extract the HTML content
let URL =
  "https://www.emerson.com/blueprint/servlet/dynamic/supportcenter/security-notifications/7099326";

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notifynet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define an async function to handle the scraping and save the result to a file
async function processPage() {
  try {
    const HTMLContent = await scrapePageContent(URL);
    //Log the result to console
    //console.log(HTMLContent);
    console.log("Start analyzing the HTML content with Gemini API ...");
    const analyzedHTML = await anaylzyWebContent(HTMLContent);
    const jsonObject = JSON.parse(analyzedHTML);
    console.log("The analyzing had been done!");
    for (const vendorData of jsonObject) {
      const vendor = new Vendor(vendorData);
      await vendor.save();
      console.log(`Saved vendor: ${vendor.vendor}`);
    }
  } catch (error) {
    console.error(error); // Catch and log any error during scraping or analysis
  } finally {
    mongoose.connection.close();
  }
}

// Call the function to process the page
processPage();
