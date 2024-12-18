import { Request, Response } from "express";
import { customRequest } from "../@types/express";
import ValidatorInterface from "../interface/ValidatorInterface";
import { FileValidatorDTOBI } from "../middleware/BiProcessFile";
import { ExtractFile} from "../utils/extractdata";
import { getNifData } from "../repository/nifRepository";


class ValidatorController {

    constructor(private validatorService : ValidatorInterface){}

    validateBiDoc = async (req: customRequest, res: Response) => {
      
        const { identificationCard,country } = req.gptResponse as FileValidatorDTOBI;
     
        if (!identificationCard) {
          return res.status(400).json({ message: 'Dados de identificação não encontrados' });
        }
    
        const result = await this.validatorService.validateUserBiDoc({ identificationCard, country: country });
    
        if (result && 'error' in result) {
          return res.status(400).json({ message: 'Erro ao salvar o BI', error: result.error });
        }
    
        res.status(200).json({ message: 'Imagem processada e BI salvo com sucesso', gptResponse: result });
      };
    

    validateBankReceipt = async (req: customRequest, res: Response) => {
            const body = await ExtractFile(req.downloadURL as string);
            if (typeof body === 'string') {
                return res.status(500).json({ message: body });
            }
            const register = await this.validatorService.validateBankReceipt(body);
            if('error' in register){
                return res.status(500).json({ message : register.error})
            }
            return res.status(200).json({message : ' Arquivo validado com sucesso', data : register})
    }

    validateNif = async (req: customRequest, res: Response) => {
     // const { name, nif} = await ExtractFile(req.downloadURL as string,);
     const name = '' 
     const nif = ''
      return res.status(200).json({message : ' Arquivo validado com sucesso', data : {name,nif}})
}

 consultNif = async(req: Request, res: Response) => {
  const { nif } = req.params;
  try {
    const nifData = await getNifData(nif);
    res.status(200).json(nifData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar o NIF.' });
  }
}


}


export default ValidatorController;