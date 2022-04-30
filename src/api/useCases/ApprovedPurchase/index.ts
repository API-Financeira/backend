import { MailProvider } from "../../providers/implementations/MailProvider";
import { MongoHotmartTokenRepository } from "../../repositories/implementations/MongoHotmartTokenRepository";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { ApprovedPurchaseController } from "./ApprovedPurchaseController";
import { ApprovedPurchaseUseCase } from "./ApprovedPurchaseUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mongoHotmartTokenRepository = new MongoHotmartTokenRepository();
const mailProvider = new MailProvider();

const approvedPurchaseUseCase = new ApprovedPurchaseUseCase(
  mongoUsersRepository,
  mongoHotmartTokenRepository,
  mailProvider,
);
const approvedPurchaseController = new ApprovedPurchaseController(
  approvedPurchaseUseCase,
);

export { approvedPurchaseController };
