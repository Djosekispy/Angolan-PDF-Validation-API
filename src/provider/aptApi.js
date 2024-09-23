import { APP_ID_GPT, MODEL_ID, MODEL_VERSION_ID, PAT, USER_ID } from "../config/variables.env";

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();




// Função que retorna a saída do modelo
export function getModelOutput(RAW_TEXT) {
    return new Promise((resolve, reject) => {
        const metadata = new grpc.Metadata();
        metadata.set("authorization", "Key " + PAT);

        stub.PostModelOutputs(
            {
                user_app_id: {
                    "user_id": USER_ID,
                    "app_id": APP_ID_GPT
                },
                model_id: MODEL_ID,
                version_id: MODEL_VERSION_ID, 
                inputs: [
                    {
                        "data": {
                            "text": {
                                "raw":`${RAW_TEXT}`
                            }
                        }
                    }
                ]
            },
            metadata,
            (err, response ) => {
                if (err) {
                    reject(new Error(err));
                }

                if (response.status.code !== 10000) {
                    reject(new Error("Post model outputs failed, status: " + response.status.description));
                }

       
                const output = response.outputs[0];
                resolve(output.data.text.raw);
            }
        );
    });
}
