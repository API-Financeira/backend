import { hash } from "bcrypt";

import { IRoles } from "../../enums/Roles";
import { IMailProvider } from "../../providers/IMailProvider";
import { IHotmartTokenRepository } from "../../repositories/IHotmartTokenRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { checkSubscription } from "../../utils/checkSubscription";
import { IApprovedPurchase } from "./ApprovedPurchaseDTO";

export class ApprovedPurchaseUseCase {
  constructor(
    private mongoUsersRepository: IUsersRepository,
    private mongoHotmartTokenRepository: IHotmartTokenRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    email,
    password,
    role,
    subscriberCode,
    subscriptionStatus,
    hotmartHotTok,
  }: IApprovedPurchase) {
    const user = await this.mongoUsersRepository.findByEmail(email);

    const isValidRole = role === IRoles.basic || role === IRoles.premium;

    if (user) throw new Error("Usuário já registrado.");
    if (hotmartHotTok !== process.env.HOTMART_HOTTOK)
      throw new Error("Hot tok inválido.");
    if (!isValidRole) throw new Error("Cargo Inválido.");

    const hotmartData = await this.mongoHotmartTokenRepository.findByKey("1");
    if (!hotmartData) throw new Error("Erro interno.");
    const { data: subscriptionData, newToken } = await checkSubscription(
      hotmartData.token,
      subscriberCode,
    );

    if (!subscriptionData) throw new Error("Erro interno.");
    if (hotmartData.token !== newToken) {
      await this.mongoHotmartTokenRepository.updateToken(
        hotmartData._id,
        newToken as string,
      );
    }

    const passwordHashed = await hash(password, 8);
    const userCreated = await this.mongoUsersRepository.createUser({
      name: subscriptionData.subscriber.name,
      email,
      password: passwordHashed,
      role,
      subscriberCode,
      subscriptionStatus,
    });

    await this.mailProvider.sendMail({
      to: {
        name: subscriptionData.subscriber.name,
        email,
      },
      from: {
        name: process.env.FROM_NAME || "No-reply",
        email: process.env.FROM_EMAIL || "noreply@gmail.com",
      },
      subject: `Seja bem vindo ao ${process.env.APP_NAME}`,
      body: `
        <body>
          <section>
            <h5>Seja muito bem vindo!</h5>
            <h2>Segue os dados de acesso</h2>
            <p>Email: ${email}</p>
            <p>Senha: ${password}</p>
            <button>Acessar aplicação</button>
          </section>
        </body>`,
    });

    userCreated.password = undefined;
    return userCreated;
  }
}
