import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';


interface ITrasaction {
    transactionCode : number;
    datetime: string;
    type: string;
    destination: string;
    iban: string;
    amount: number;
}

export default class Transaction {
    private datetime: string;
    private type: string;
    private destination: string;
    private iban: string;
    private amount: number;
    private transactionCode: number;

    constructor(datetime: string, destination: string, type: string, iban: string,amount:number,transactionCode:number) {
        this.datetime = datetime;
        this.destination = destination;
        this.iban = iban;
        this.type = type;
        this.amount = amount;
        this.transactionCode = transactionCode;
    }

    save(): ITrasaction[] | { error: string } {
        try {
            const transactionFilePath = path.join(__dirname, '../db/transaction.json');

            if (!existsSync(transactionFilePath)) {
                writeFileSync(transactionFilePath, JSON.stringify([])); 
            }

            const contentFile = this.gettransaction(); 
            if ("error" in contentFile) {
                throw new Error(contentFile.error); 
            }

            let ConvertJson: ITrasaction[] = [];

            const newDate: ITrasaction = {
                datetime: this.datetime,
                destination: this.destination,
                iban: this.iban,
                type: this.type,
                transactionCode : this.transactionCode,
                amount: this.amount
            };

            if (contentFile.length === 0) {

                ConvertJson = [newDate];
            } else {
    
                ConvertJson = [...contentFile, newDate];
            }

            writeFileSync(transactionFilePath, JSON.stringify(ConvertJson));

            return this.gettransaction();
        } catch (error) {
            return { error: (error as Error).message };
        }
    }


    gettransaction(): ITrasaction[] | { error: string } {
        try {
            const transactionFilePath = path.join(__dirname, '../db/transaction.json');
            const fileContent = readFileSync(transactionFilePath, 'utf-8');

            if (fileContent.trim() === "") {
                return [];
            }
            return JSON.parse(fileContent) as ITrasaction[];
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

     validateBiTransactionCode(code: number) {
        try {
            const contentFile = this.gettransaction(); 
            if ("error" in contentFile) {
                throw new Error(contentFile.error); 
            }
            const codeExists = contentFile.some(item => item.transactionCode === code);
            if (codeExists) {
                throw new Error('Comprovativo inválido: código de transação já existe');
            }
            return codeExists;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    

     validateIban(iban: string){
        const ibanRegex = /^AO\d{2}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{1}$/;
        return ibanRegex.test(iban);
    };
    
    
    
    ValidatorFile() {
        const fileDate = new Date(this.datetime);
        const today = new Date();
        if (fileDate > today) {
            throw new Error('Data não pode ser maior que a data de hoje');
        }
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        if (fileDate < sixMonthsAgo) {
            throw new Error('Data não pode ser inferior a seis meses');
        }
    
        if (!this.validateIban(this.iban)) {
            throw new Error('IBAN Inválido');
        }
    }
  
}
