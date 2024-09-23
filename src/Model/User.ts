import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';


interface IUser {
    username: string;
    parents: string;
    address: string;
    birthDay: string;
}

export default class User {
    private username: string;
    private parents: string;
    private address: string;
    private birthDay: string;

    constructor(username: string, address: string, parents: string, birthDay: string) {
        this.username = username;
        this.address = address;
        this.birthDay = birthDay;
        this.parents = parents;
    }

    save(): IUser[] | { error: string } {
        try {
            const userFilePath = path.join(__dirname, '../db/user.json');

            if (!existsSync(userFilePath)) {
                writeFileSync(userFilePath, JSON.stringify([])); 
            }

            const contentFile = this.getUser(); 
            if ("error" in contentFile) {
                throw new Error(contentFile.error); 
            }

            let ConvertJson: IUser[] = [];

            const newDate: IUser = {
                username: this.username,
                address: this.address,
                birthDay: this.birthDay,
                parents: this.parents
            };

            if (contentFile.length === 0) {

                ConvertJson = [newDate];
            } else {
    
                ConvertJson = [...contentFile, newDate];
            }

            writeFileSync(userFilePath, JSON.stringify(ConvertJson));

            return this.getUser();
        } catch (error) {
            return { error: (error as Error).message };
        }
    }


    getUser(): IUser[] | { error: string } {
        try {
            const userFilePath = path.join(__dirname, '../db/user.json');
            const fileContent = readFileSync(userFilePath, 'utf-8');

            if (fileContent.trim() === "") {
                return [];
            }
            return JSON.parse(fileContent) as IUser[];
        } catch (error) {
            return { error: (error as Error).message };
        }
    }
}
