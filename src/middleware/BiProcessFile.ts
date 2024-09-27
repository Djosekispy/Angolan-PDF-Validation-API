import { NextFunction, Request, Response } from "express";
import { customRequest } from "../@types/express";
import Tesseract from "tesseract.js";
import path from "path";
import convertPdfToImages from "../utils/pdftoImage";
import { getModelOutput } from "../utils/aptApi";

type FileValidatorDTOBI = {
  country: string;
  identificationCard: {
    fullName: string;
    fatherName: string;
    motherName: string;
    cardNumber: string;
    residence: string;
    birthPlace: string;
    province: string;
    birthDate: string;
    sex: string;
    height: string;
    maritalStatus: string;
    issueDate: string;
    expiryDate: string;
  };
};

async function ReadingAndExtractDataFromImage(req: customRequest, res: Response, next: NextFunction) {
  let url = req.downloadURL as string;

  try {
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'Invalid file URL' });
    }

    const fileExtension = path.extname(url).toLowerCase();

    if (fileExtension === '.pdf') {
      const outputDir = 'src/public/output_images';
      const pdfFilePath = url; 
      [url] = await convertPdfToImages(pdfFilePath, outputDir); 
    }

    const { data: { text } } = await Tesseract.recognize(
      url,
      'por', 
      {
        logger: (m) => console.log(m), 
      }
    );

    const formattedText = text.replace(/\n\s*\n/g, '\n').trim();

    const question = `Neste conteúdo, quero que extraia toda a informação e organize. Levando em conta as regras de criação de atributos. Retorne apenas o resultado no seguinte formato JSON:
    ${JSON.stringify({
      country: "string",
      identificationCard: {
        fullName: "string",
        fatherName: "string",
        motherName: "string",
        cardNumber: "string",
        residence: "string",
        birthPlace: "string",
        province: "string",
        birthDate: "string",
        sex: "string",
        height: "string",
        maritalStatus: "string",
        issueDate: "string",
        expiryDate: "string"
      }
    })}: ${formattedText}`;

    const fileVerify = await getModelOutput(question);

    const jsonString = fileVerify.replace(/```json\n|\n```/g, '').trim();
    const jsonObject = JSON.parse(jsonString);
    req.gptResponse = jsonObject;
    next();

  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err });
  }
}

export { ReadingAndExtractDataFromImage, FileValidatorDTOBI };
