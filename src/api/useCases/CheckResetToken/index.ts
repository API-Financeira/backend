import { CheckResetTokenController } from "./CheckResetTokenController";
import { CheckResetTokenUseCase } from "./CheckResetTokenUseCase";

const checkResetTokenUseCase = new CheckResetTokenUseCase();
const checkResetTokenController = new CheckResetTokenController(
  checkResetTokenUseCase,
);

export { checkResetTokenController };
