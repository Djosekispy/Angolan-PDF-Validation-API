import { Request, Response } from "express";
import User from "../Model/User";
import { customRequest } from "../@types/express";
import Transaction from "../Model/Transaction";


class UserController {

    async create(req : customRequest, res : Response){
        try {
            const { username, address, parent,birthDay } = req.body
            const save = new User(username, address, parent,birthDay)
            const user = save.save();
            return res.status(200).json({message : 'user saved successfully',user})
        } catch (error) {
            return res.status(500).json({ message : 'not saved : ' + error})
        }
      
    }
    async loadIban(req: customRequest, res: Response) {
        try {
            const data = req.fileData;
            
            const amountStr = data?.amount.replace(/Kz|,|\./g, '').trim();
            const amount = parseInt(amountStr as string);
            
            const transaction = new Transaction(
                data?.datetime as string,
                data?.receiver as string,
                data?.transactionType as string,
                data?.iban as string,
                amount,
                parseInt(data?.transactionNumber as string)
            );
    
            transaction.ValidatorFile();
            await transaction.validateBiTransactionCode(parseInt(data?.transactionNumber as string, 10));
    
            const savedTransaction = transaction.save();
            return res.status(200).json({ message: 'User saved successfully', transaction: savedTransaction });
        } catch (error) {
            return res.status(500).json({ message: 'Not saved: ' + error });
        }
    }
    
}


export default UserController;