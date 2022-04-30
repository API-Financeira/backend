import { MongoHotmartTokenRepository } from "../../repositories/implementations/MongoHotmartTokenRepository";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { CheckUserController } from "./CheckUserController";
import { CheckUserUseCase } from "./CheckUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mongoHotmartTokenRepository = new MongoHotmartTokenRepository();

const checkUserUseCase = new CheckUserUseCase(
  mongoUsersRepository,
  mongoHotmartTokenRepository,
);
const checkUserController = new CheckUserController(checkUserUseCase);

export { checkUserController };
