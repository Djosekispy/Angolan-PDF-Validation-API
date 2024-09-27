import { Poppler } from 'node-poppler';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';  

async function convertPdfToImages(pdfPath: string, outputDir: string): Promise<string[]> {
  const poppler = new Poppler();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`O arquivo PDF não foi encontrado no caminho: ${pdfPath}`);
  }

  const options = {
    pngFile: true,  
    firstPageToConvert: 1, 
    lastPageToConvert: 0,  
  };

  try {
    const uniqueId = uuidv4();  
    const outputFilePrefix = `output_image_${uniqueId}`;  

    const outputPath = path.join(outputDir, `${outputFilePrefix}`);

     await poppler.pdfToCairo(pdfPath, outputPath, options);

     const files = fs.readdirSync(outputDir);
     const imageFiles = files.filter(file => file.startsWith(outputFilePrefix) && file.endsWith('.png'));

    return [`${outputDir}/${imageFiles}`];
  } catch (error) {
    throw new Error('Erro ao converter PDF para imagem: ' + error);
  }
}

export default convertPdfToImages;
