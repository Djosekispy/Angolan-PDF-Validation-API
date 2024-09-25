import express from 'express'
import { validatorController } from './bootstrap';
import { saveFilePathMiddleware, uploadFile } from '../middleware/upload';
import { ReadingFile } from '../middleware/ValidateProfTranser';
import { ReadingAndExtractDataFromImage } from '../middleware/BiProcessFile';

const userRoutes = express.Router();


userRoutes.post('/profbank/save', uploadFile,saveFilePathMiddleware,ReadingFile,validatorController.validateBankReceipt);
userRoutes.post('/bidoc/save', uploadFile,saveFilePathMiddleware,ReadingAndExtractDataFromImage,validatorController.validateBiDoc);

export default userRoutes;