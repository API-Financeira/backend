import { BcryptProvider } from "../../providers/implementations/BcryptProvider";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { EditPasswordController } from "./EditPasswordController";
import { EditPasswordUseCase } from "./EditPasswordUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const bcryptProvider = new BcryptProvider();
const editPasswordUseCase = new EditPasswordUseCase(
  mongoUsersRepository,
  bcryptProvider,
);
const editPasswordController = new EditPasswordController(editPasswordUseCase);

export { editPasswordController };
