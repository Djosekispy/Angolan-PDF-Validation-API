import express from 'express';
import { saveFilePathMiddleware, uploadFile } from '../middleware/upload';
import { ReadingAndExtractDataFromImage } from '../middleware/BiProcessFile';
import { validatorController } from './bootstrap';

const userRoutes = express.Router();

/**
 * @swagger
 * /profbank/save:
 *   post:
 *     summary: Valida um comprovante de transferência bancária
 *     description: Faz upload de um comprovante de transferência bancária e valida os dados.
 *     tags:
 *       - Transferência Bancária
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprovante validado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Arquivo validado com sucesso"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "xxxxxxxxxxxxxxxxxxxx"
 *                       datetime:
 *                         type: string
 *                         example: "xxxx-xx-xx xx:xx:xx"
 *                       destination:
 *                         type: string
 *                         example: "xxxxxxxxxx"
 *                       iban:
 *                         type: string
 *                         example: "AO06.xxxx.xxxx.xxxx.xxxx.xxxx.x"
 *                       type:
 *                         type: string
 *                         example: "Transferência Bancária"
 *                       transactionCode:
 *                         type: number
 *                         example: xxxxxxxx
 *                       amount:
 *                         type: number
 *                         example: xxxxxxxx
 *       400:
 *         description: Erro interno do servidor
 */

userRoutes.post('/profbank/save', uploadFile, saveFilePathMiddleware,validatorController.validateBankReceipt);

/**
 * @swagger
 * /bidoc/save:
 *   post:
 *     summary: Valida um documento de BI
 *     description: Faz upload de um arquivo de BI e extrai os dados utilizando OCR.
 *     tags:
 *       - BI
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Documento BI validado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Imagem processada e BI salvo com sucesso"
 *                 gptResponse:
 *                   type: object
 *                   properties:
 *                     country:
 *                       type: string
 *                       example: "REPÚBLICA DE ANGOLA"
 *                     identificationCard:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           example: "xxxxxxxxxx"
 *                         fatherName:
 *                           type: string
 *                           example: "xxxxxxxxxx"
 *                         motherName:
 *                           type: string
 *                           example: "xxxxxxxxxx"
 *                         cardNumber:
 *                           type: string
 *                           example: "xxxxxxxxxx"
 *                         residence:
 *                           type: string
 *                           example: "CASA S/Nº xxxxxxxx"
 *                         birthPlace:
 *                           type: string
 *                           example: "xxxxxx"
 *                         province:
 *                           type: string
 *                           example: "xxxxxx"
 *                         birthDate:
 *                           type: string
 *                           example: "xx/xx/xxxx"
 *                         sex:
 *                           type: string
 *                           example: "xxxxxxxx"
 *                         height:
 *                           type: string
 *                           example: "xxx"
 *                         maritalStatus:
 *                           type: string
 *                           example: "xxxxxxxxx"
 *                         issueDate:
 *                           type: string
 *                           example: "xx/xx/xxxx"
 *                         expiryDate:
 *                           type: string
 *                           example: "xx/xx/xxxx"
 *       400:
 *         description: Erro interno do servidor
 */

userRoutes.post('/bidoc/save', uploadFile, saveFilePathMiddleware, ReadingAndExtractDataFromImage, validatorController.validateBiDoc);


/**
 * @swagger
 * /nif/show:
 *   post:
 *     summary: Valida um documento de NIF
 *     description: Faz upload de um arquivo de NIF e extrai os dados utilizando OCR.
 *     tags:
 *       - NIF
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Documento NIF validado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Arquivo validado com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "XXXXXXXXXXX"
 *                     nif:
 *                       type: string
 *                       example: "XXXXXXXXXXXX"
 *       400:
 *         description: Erro interno do servidor
 */

userRoutes.post('/nif/show', uploadFile, saveFilePathMiddleware,validatorController.validateNif);


export default userRoutes;
