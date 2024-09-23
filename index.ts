import express from 'express'
import { corsMiddleware } from './src/middleware/cors';
import userRoutes from './src/routes';
import { SERVER_PORT } from './src/config/variables.env';

const app = express();
const port = SERVER_PORT;

app.use(corsMiddleware);
app.use(express.json());
app.use(userRoutes);

app.listen(port,async ()=>{
 console.log(`Servidor rodando  na porta: ${port}`);
});