import { Request } from 'express';
import { FileValidatorDTO } from '../middleware/ValidateProfTranser';
import { FileValidatorBiDTO } from '../middleware/validateBI';
import { FileNifValidatorDTO } from '../middleware/ValidateNif';

export interface customRequest extends Request{
    downloadURL?: string;
    fileData?: FileValidatorDTO;
    fileBiData? : FileValidatorBiDTO;
    gptResponse ? : FileValidatorDTOBI
    fileDataNif ? : FileNifValidatorDTO
  
}

