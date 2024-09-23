import { Request } from 'express';
import { FileValidatorDTO } from '../middleware/ValidateProfTranser';
import { FileValidatorBiDTO } from '../middleware/validateBI';

export interface customRequest extends Request{
    downloadURL?: string;
    fileData?: FileValidatorDTO;
    fileBiData? : FileValidatorBiDTO
  
}

