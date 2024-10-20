import { FileValidatorDTOBI } from "../middleware/BiProcessFile";
import { ITrasaction } from "../Model/Transaction";
import { FileValidatorDTO } from "./ibanDTO";


interface ValidatorInterface {
    validateBankReceipt({ datetime,transactionType,receiver ,iban,amount,total,transactionNumber}:FileValidatorDTO): Promise<ITrasaction | { error : string}>;
    validateUserBiDoc(identificationCard: FileValidatorDTOBI): Promise< FileValidatorDTOBI | { error : string}>;
    
}

export default ValidatorInterface;