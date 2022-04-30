import { IHotmartTokenRepository } from "../../repositories/IHotmartTokenRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { checkSubscription } from "../../utils/checkSubscription";

export class CheckUserUseCase {
  constructor(
    private mongoUsersRepository: IUsersRepository,
    private mongoHotmartTokenRepository: IHotmartTokenRepository,
  ) {}

  async execute(id: string, token: string) {
    const user = await this.mongoUsersRepository.findById(id);

    if (!user) throw new Error("Usuário não encontrado.");
    if (user.token !== token)
      throw new Error("Sua conta foi logada em outro dispositivo.");

    const hotmartData = await this.mongoHotmartTokenRepository.findByKey("1");
    if (!hotmartData) throw new Error("Erro interno.");
    const { data: subscriptionData, newToken } = await checkSubscription(
      hotmartData.token,
      user.subscriberCode,
    );

    if (!subscriptionData) throw new Error("Erro interno.");
    if (hotmartData.token !== newToken) {
      await this.mongoHotmartTokenRepository.updateToken(
        hotmartData._id,
        newToken as string,
      );
    }

    if (subscriptionData.status !== "ACTIVE")
      throw new Error(
        "Houve um erro ao consultar a sua assinatura, cheque-a na aba 'Assinaturas'.",
      );

    const { email, name, role, subscriptionStatus, subscriberCode } = user;

    return {
      id: user._id,
      email,
      name,
      role,
      subscriptionStatus,
      subscriberCode,
    };
  }
}
