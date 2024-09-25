import { APP_ID_GPT, MODEL_ID_VISION, MODEL_VERSION_ID_VISION, PAT_VISION, USER_ID } from '../config/variables.env';

const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const fs = require('fs');


const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT_VISION);

const processImageWithGPT = async (filePath, prompt) => {
  try {
    const fileBytes = fs.readFileSync(filePath);

    return new Promise((resolve, reject) => {
      stub.PostModelOutputs(
        {
          user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID_GPT
          },
          model_id: MODEL_ID_VISION,
          version_id: MODEL_VERSION_ID_VISION,
          inputs: [
            {
              "data": {
                "image": {
                  "base64": fileBytes.toString('base64') 
                },
                "text": { 
                  "raw": prompt
                }
              }
            }
          ]
        },
        metadata,
        (err, response) => {
          if (err) {
            return reject(new Error('Erro na API GPT-4: ' + err.message));
          }

          if (response.status.code !== 10000) {
            return reject(new Error('Erro ao processar imagem: ' + response.status.description));
          }

          const output = response.outputs[0];
          resolve(output.data.text.raw); 
        }
      );
    });
  } catch (error) {
    throw new Error('Erro ao ler ou processar o arquivo de imagem: ' + error.message);
  }
};

export default  processImageWithGPT ;
