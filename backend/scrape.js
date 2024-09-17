import axios from "axios";
import * as cheerio from "cheerio";

async function scrapePageContent(url) {
  try {
    const { data } = await axios.get(url); // Fetch the HTML content

    // Use cheerio to parse the HTML and extract anchor tags only
    const $ = cheerio.load(data);
    const links = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      const text = $(element).text().trim();
      links.push({ href, text });
    });

    // Convert extracted anchor tags to a string
    return JSON.stringify(links);
  } catch (error) {
    console.error("Error while scraping:", error);
    return "";
  }
}

export { scrapePageContent };
