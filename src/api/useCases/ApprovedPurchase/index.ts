import { MailProvider } from "../../providers/implementations/MailProvider";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { ApprovedPurchaseController } from "./ApprovedPurchaseController";
import { ApprovedPurchaseUseCase } from "./ApprovedPurchaseUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mailProvider = new MailProvider();
const approvedPurchaseUseCase = new ApprovedPurchaseUseCase(
  mongoUsersRepository,
  mailProvider,
);
const approvedPurchaseController = new ApprovedPurchaseController(
  approvedPurchaseUseCase,
);

export { approvedPurchaseController };
