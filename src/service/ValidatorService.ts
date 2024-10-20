import { FileValidatorDTO } from "../interface/ibanDTO";
import ValidatorInterface from "../interface/ValidatorInterface";
import { FileValidatorDTOBI } from "../middleware/BiProcessFile";
import { ITrasaction, Transaction } from "../Model/Transaction";
import { User } from "../Model/User";

class ValidatorService implements ValidatorInterface {
  async validateBankReceipt({
    datetime,
    transactionType,
    receiver,
    iban,
    amount,
    total,
    transactionNumber
  }: FileValidatorDTO): Promise<ITrasaction | { error: string }> {
    try {
      const amountStr = String(amount).replace(/Kz|,|\./g, '').trim();
      const amountConverted = parseInt(amountStr as string);

      const transaction = new Transaction({
        datetime,
        destination: receiver,
        type: transactionType,
        iban,
        amount: amountConverted,
        transactionCode: parseInt(transactionNumber)
      });

      transaction.ValidatorFile();
      await transaction.validateBiTransactionCode(parseInt(transactionNumber));

      const savedTransaction = transaction.save();
      return savedTransaction;
    } catch (error) {
      return { error: 'Erro ao salvar ' + error };
    }
  }

  async validateUserBiDoc(identificationCard: FileValidatorDTOBI): Promise<FileValidatorDTOBI | { error: string }> {
    try {
      const user = new User(identificationCard.identificationCard);
      const savedUser = user.save();

      if ('error' in savedUser) {
        return { error: savedUser.error };
      }
      
      return identificationCard;
    } catch (error) {
      return { error: 'Erro ao salvar o usuário: ' + error };
    }
  }
 
}

export default ValidatorService;
