import { FileValidatorDTOBI } from "../middleware/BiProcessFile";
import { FileValidatorDTO } from "../middleware/ValidateProfTranser";
import { ITrasaction } from "../Model/Transaction";


interface ValidatorInterface {
    validateBankReceipt({ datetime,transactionType,receiver ,iban,amount,total,transactionNumber}:FileValidatorDTO): Promise<ITrasaction | { error : string}>;
    validateUserBiDoc(identificationCard: FileValidatorDTOBI): Promise< FileValidatorDTOBI | { error : string}>;
}

export default ValidatorInterface;