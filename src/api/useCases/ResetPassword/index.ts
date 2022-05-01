import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { ResetPasswordController } from "./ResetPasswordController";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const resetPasswordUseCase = new ResetPasswordUseCase(mongoUsersRepository);
const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

export { resetPasswordController };
