import { NextFunction, Request, Response } from "express";
import { getModelOutput } from "../provider/aptApi";
import { customRequest } from "../@types/express";
import { readFileSync } from 'fs';
import { createWorker } from 'tesseract.js';
import { PDFImage } from 'pdf-image';

interface FileValidatorBiDTO {
    username: string;
    parents: string;
    BiNumBer: string;
    address: string;
    city: string;
    province: string;
    gender: string;
    state: string;
    birthday: string; // Corrigido de "brithday" para "birthday"
    length: string;
    emitedAt: string;
    validateAt: string;
}

async function ReadingFileBi(req: customRequest, res: Response, next: NextFunction) {
    const url = req.downloadURL as string;

    try {
        const worker = await createWorker('por', 1, {
            logger: m => console.log(m),
        });

        // Criar uma instância de PDFImage
        const pdfImage = new PDFImage(url);
        const imagePaths = await pdfImage.convertFile();

        let fullText = '';

        // Processar cada imagem com Tesseract
        for (const imagePath of imagePaths) {
            const { data: { text } } = await worker.recognize(imagePath);
            fullText += text + '\n';
        }
  console.log(fullText)
        const question = `Neste conteúdo, quero que extraia o nome completo como username, Filiação como parents, número do bilhete de identidade como BiNumBer, Residência como address, Naturalidade como city, Provincia como province, sexo como gender, estado civil como state, data de nascimento como birthday, altura como length, data de emissão como emitedAt, data de validade como validateAt. Retorne apenas o resultado em código JSON: ${fullText}`;

        const fileVerify = await getModelOutput(question);
        const jsonString = fileVerify.replace(/```json\n|\n```/g, '').trim();
        const jsonObject = JSON.parse(jsonString);
        req.fileBiData = jsonObject;

        await worker.terminate();
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao processar o arquivo: ' + err });
    }
}

export { ReadingFileBi, FileValidatorBiDTO };
