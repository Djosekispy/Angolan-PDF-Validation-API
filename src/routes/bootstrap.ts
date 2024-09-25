import ValidatorController from "../controllers/ValidatorController";
import { validatorService } from "../service";

const validatorController = new ValidatorController(validatorService);

export { validatorController }