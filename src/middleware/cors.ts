import cors from 'cors';
import { CorsOptions } from 'cors';


const corsOptions: CorsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  exposedHeaders: ['Content-Length', 'X-Total-Count'], 
};

export const corsMiddleware = cors(corsOptions);
