import { MailProvider } from "../../providers/implementations/MailProvider";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { ForgotPasswordController } from "./ForgotPasswordController";
import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mailProvider = new MailProvider();
const forgotPasswordUseCase = new ForgotPasswordUseCase(
  mongoUsersRepository,
  mailProvider,
);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

export { forgotPasswordController };
