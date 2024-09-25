import { Request, Response, NextFunction } from 'express';


function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: `Erro interno do servidor: ${err.message}` });
}

export default errorHandler;
