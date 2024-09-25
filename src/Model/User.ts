import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

type FileValidatorDTOBI = {
  country: string;
  identificationCard: {
    fullName: string;
    fatherName: string;
    motherName: string;
    cardNumber: string;
    residence: string;
    birthPlace: string;
    province: string;
    birthDate: string;
    sex: string;
    height: string;
    maritalStatus: string;
    issueDate: string;
    expiryDate: string;
  };
};

class User {
  private identificationCard: FileValidatorDTOBI['identificationCard'];

  constructor(identificationCard: FileValidatorDTOBI['identificationCard']) {
    this.identificationCard = identificationCard;
  }

  private isCardExpired(expiryDate: string): boolean {
    const currentDate = new Date();
    const cardExpiryDate = new Date(expiryDate);
    return cardExpiryDate < currentDate;
  }

  save():  FileValidatorDTOBI | { error: string } {
    try {
      const userFilePath = path.join(__dirname, '../db/user.json');

      if (!existsSync(userFilePath)) {
        writeFileSync(userFilePath, JSON.stringify([])); 
      }

      const contentFile = this.getUsers();
      if ("error" in contentFile) {
        throw new Error(contentFile.error);
      }

      let users: FileValidatorDTOBI[] = contentFile as FileValidatorDTOBI[];

      if (!this.identificationCard || !this.identificationCard.cardNumber) {
        return { error: 'Número do cartão de identificação não fornecido.' };
      }
      
 if(users.length > 0){
   const userExists = users.some(user => user.identificationCard.cardNumber === this.identificationCard.cardNumber);
   if (userExists) {
     return { error: 'Usuário com este número de identificação já existe.' };
   }
      }

      if (this.isCardExpired(this.identificationCard.expiryDate)) {
        return { error: 'Cartão de identificação expirado.' };
      }

      const newUser: FileValidatorDTOBI = {
        country: 'Angola', 
        identificationCard: this.identificationCard
      };

      users = [...users, newUser];

      writeFileSync(userFilePath, JSON.stringify(users)); 

      return newUser; 
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  getUsers(): FileValidatorDTOBI[] | { error: string } {
    try {
      const userFilePath = path.join(__dirname, '../db/user.json');
      const fileContent = readFileSync(userFilePath, 'utf-8');

      if (fileContent.trim() === "") {
        return [];
      }
      return JSON.parse(fileContent) as FileValidatorDTOBI[];
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
}

export { User, FileValidatorDTOBI };
