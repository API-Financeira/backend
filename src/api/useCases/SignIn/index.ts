import { BcryptProvider } from "../../providers/implementations/BcryptProvider";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const bcryptProvider = new BcryptProvider();
const signInUseCase = new SignInUseCase(mongoUsersRepository, bcryptProvider);
const signInController = new SignInController(signInUseCase);

export { signInController };
