// server.js
import app from "./app.js"; // Import the Express app
//import scrapeAndSave from "./scrapeAndSave.js"; // Import the scraping function

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  /*
  // Schedule scraping with node-cron
  cron.schedule("0 7 * * *", () => {
    console.log("Running automated scraping with cron...");
    scrapeAndSave();
  });
  */
});
