import { NextFunction, Request, Response } from "express";
import axios from "axios";
import pdfParse from "pdf-parse";
import { getModelOutput } from "../utils/aptApi";
import { customRequest } from "../@types/express";
import { readFileSync } from "fs";

interface FileNifValidatorDTO {
        name : string;
        nif : string;
}


async function ReadingFileNif(req: customRequest, res: Response, next: NextFunction) {
    const url = req.downloadURL as string;
    try {
      if (typeof url !== 'string') {
        return res.status(400).json({ message: 'Invalid file URL' });
      }
  
      const response = readFileSync(url);
      
      const pdfData = await pdfParse(response);
      const formattedText = pdfData.text
        .replace(/\n\s*\n/g, '\n')
        .trim();
        
      const question = `Neste conteúdo, quero que extraia a nome como name, e Número de Identificação como nif. Retorne apenas o resultado em código JSON: ${formattedText}`;
      
      const fileVerify = await getModelOutput(question);
      const jsonString = fileVerify.replace(/```json\n|\n```/g, '').trim();
  
      const jsonObject = JSON.parse(jsonString);
      req.fileDataNif = jsonObject;
      next();
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }
  }
  



export { ReadingFileNif, FileNifValidatorDTO };
