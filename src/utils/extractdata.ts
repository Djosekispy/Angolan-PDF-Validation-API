import pdfParse from "pdf-parse";
import { getModelOutput } from "../utils/aptApi";
import { readFileSync } from "fs";




async function ExtractFile(url : string, sms : string) {

    try {
      if (typeof url !== 'string') {
        throw new Error("Invalid File URL");
      }
  
      const response = readFileSync(url);
      
      const pdfData = await pdfParse(response);
      const formattedText = pdfData.text
        .replace(/\n\s*\n/g, '\n')
        .trim();
        
        const question = `${sms} : ${formattedText}`;
      
      const fileVerify = await getModelOutput(question);
      const jsonString = fileVerify.replace(/```json\n|\n```/g, '').trim();
  
      const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (err) {
      return  'An error occurred' + err;
    }
  }
  



export { ExtractFile };
