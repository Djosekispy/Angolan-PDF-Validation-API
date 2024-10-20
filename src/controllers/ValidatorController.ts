import { Request, Response } from "express";
import { customRequest } from "../@types/express";
import ValidatorInterface from "../interface/ValidatorInterface";
import { FileValidatorDTO } from "../middleware/ValidateProfTranser";
import { FileValidatorDTOBI } from "../middleware/BiProcessFile";
import { FileNifValidatorDTO } from "../middleware/ValidateNif";


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
            const { datetime,transactionType,receiver ,iban,amount,total,transactionNumber} = req.fileData as FileValidatorDTO;
            const register = await this.validatorService.validateBankReceipt({datetime,transactionType,receiver ,iban,amount,total,transactionNumber})
            if('error' in register){
                return res.status(500).json({ message : register.error})
            }
            return res.status(200).json({message : ' Arquivo validado com sucesso', data : register})
    }

    validateNif = async (req: customRequest, res: Response) => {
      const { name, nif} = req.fileDataNif as FileNifValidatorDTO;
      
      return res.status(200).json({message : ' Arquivo validado com sucesso', data : {name,nif}})
}
    

}


export default ValidatorController;