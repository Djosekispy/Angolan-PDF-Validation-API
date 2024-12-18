import { Nif } from "../Model/nif";
import { consultarNif } from "../service/nifService";

export async function getNifData(nif: string): Promise<Nif> {
    
  return await consultarNif(nif);
}
