import express from 'express'
import { userController } from './bootstrap';
import { saveFilePathMiddleware, uploadFile } from '../middleware/upload';
import { ReadingFileBi } from '../middleware/validateBI';
import { ReadingFile } from '../middleware/ValidateProfTranser';

const userRoutes = express.Router();

userRoutes.post('/save', uploadFile, saveFilePathMiddleware,ReadingFileBi,userController.create);

userRoutes.post('/profbank/save', uploadFile,saveFilePathMiddleware,ReadingFile,userController.loadIban);

export default userRoutes;