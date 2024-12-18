import pdfParse from "pdf-parse";
import { getModelOutput } from "../utils/aptApi";
import { readFileSync } from "fs";
import axios from "axios";
import { FileValidatorDTO } from "../interface/ibanDTO";




async function ExtractFile(url : string, ) : Promise<FileValidatorDTO | string> {

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const pdfData = await pdfParse(response.data);
      const formattedText = pdfData.text
        .replace(/\n\s*\n/g, '\n') 
        .trim(); 
        const formattedResponse = parseApiResponse(formattedText);
        await ValidatorFile(formattedResponse);
      const jsonObject = formattedResponse;
        return jsonObject;
    } catch (err) {
      return  'An error occurred' + err;
    }
  }
  const validateAngolanIban = (iban: string): boolean => {
  
    const cleanIban = iban.replace(/[.\s]/g, '');
    
    if (!cleanIban.match(/^AO\d{23}$/)) {
        return false;
    }
    const originalFormat = iban.match(/^AO\d{2}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{1}$/);
    
    if (!originalFormat) {
        return false;
    }

    return true;
};

async function ValidatorFile(data: FileValidatorDTO): Promise<any> {
  const currentMonth = new Date().getMonth();
  const fileMonth = new Date(data.datetime).getMonth();
      if (!validateAngolanIban(data.iban)) {
          throw new Error(`IBAN do comprovativo Inválido ou fora do padrão : ${data.iban}`);
      }
  return data;
}

  
  function parseApiResponse(apiResponse: string): FileValidatorDTO {
    const normalizedResponse = apiResponse.replace(/\n/g, "").trim();
  
    const datetimeMatch = normalizedResponse.match(/Data\s*-\s*Hora(\d{2}-\d{2}-\d{4}\s*\d{2}:\d{2}:\d{2})/);
    const transactionTypeMatch = normalizedResponse.match(/Operação([\w\sçã]+)\s*Destinatário/);
    const receiverMatch = normalizedResponse.match(/Destinatário([A-Z\s]+)\s*IBAN/);
    const ibanMatch = normalizedResponse.match(/IBAN(AO\d{2}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d)/);
    const amountMatch = normalizedResponse.match(/Montante([\d.,]+Kz)/);
    const totalMatch = normalizedResponse.match(/Total([\d.,]+ Kz)/);
    const transactionNumberMatch = normalizedResponse.match(/Transacção(\d+)/);
  
    return {
      datetime: datetimeMatch ? datetimeMatch[1] : "",
      transactionType: transactionTypeMatch ? transactionTypeMatch[1].trim() : "Transferência Bancária",
      receiver: receiverMatch ? receiverMatch[1].trim() : "",
      iban: ibanMatch ? ibanMatch[1].replace(/\s/g, "") : "",
      amount: amountMatch ? amountMatch[1].trim() : "",
      total: totalMatch ? totalMatch[1].trim() : "",
      transactionNumber: transactionNumberMatch ? transactionNumberMatch[1] : "",
    };
  }



export { ExtractFile };
