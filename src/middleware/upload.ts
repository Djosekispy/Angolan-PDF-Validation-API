import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { customRequest } from '../@types/express';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); 
  }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedFileTypes = /pdf/;
  const mimeType = file.mimetype === 'application/pdf';
  const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type. Only PDF files are allowed.'));
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } 
});


const uploadFile = upload.single('file'); 


const saveFilePathMiddleware = (req: customRequest, res: Response, next: NextFunction) => {
  if (req.file) {
    req.downloadURL = req.file.path; 
  }
  next();
};

export { uploadFile, saveFilePathMiddleware };
