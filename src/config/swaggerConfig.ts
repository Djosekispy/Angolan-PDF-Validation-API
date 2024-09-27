import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Validação de PDFs para o Sistema Angolano',
      version: '1.0.0',
      description: 'Esta API está sendo desenvolvida para validar documentos em formato PDF normal e com conteudo scaneado, com foco em documentos amplamente utilizados no sistema angolano, como Bilhetes de Identidade (BI), comprovativos de transferências bancárias, e outros documentos administrativos. O projeto encontra-se em fase de desenvolvimento. A API utiliza a GPT-4 Turbo para realizar a extração e estruturação dos dados dos documentos PDF. A GPT-4 Turbo é responsável por interpretar o conteúdo dos documentos e retornar informações organizadas no formato JSON, facilitando a validação dos dados.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


export const setupSwagger = (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
