import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function anaylzyWebContent(htmlContent) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Here is the HTML content of a webpage:
    ${htmlContent}
    
    Please extract only the <a> tags from this HTML that look like an alert report, including the href attribute, the link text and also add id and if there a date in the title cut it and put in i date below then remove in from the title and the tile vaule is the same of the decription value. Also only 10 record I need.
    Return only the result in strict JSON format without any additional explanations, comments, or formatting. For example:
    [
        {"vedor": "websitename1" alert:[{ "id": 1, "href": "url1", "title": "link1", description: "link1", date: "date1" }]},
        {"vedor": "websitename2" alert:[{ "id" 2, vendor: "websitenam2", "href": "url2", "title": "link2", description: "link2", date: "date2" }]    
    ]
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const JSONResult = response.text();
  return JSONResult;
}

export { anaylzyWebContent };
