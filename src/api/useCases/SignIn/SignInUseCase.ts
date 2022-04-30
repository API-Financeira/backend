import { sign } from "jsonwebtoken";

import { IBcryptProvider } from "../../providers/IBcryptProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ISignInDTO } from "./SignInDTO";

export class SignInUseCase {
  constructor(
    private mongoUsersRepository: IUsersRepository,
    private bcryptProvider: IBcryptProvider,
  ) {}

  async execute({ email, password }: ISignInDTO) {
    const user = await this.mongoUsersRepository.findByEmail(email);
    if (!user) throw new Error("Email ou senha incorreto.");

    const comparePassword = await this.bcryptProvider.compare(
      password,
      user.password as string,
    );

    if (!comparePassword) throw new Error("Email ou senha incorreto.");

    const token = sign(
      {
        id: user._id,
      },
      `${process.env.JWT_SECRET}`,
      {
        subject: `${user._id}`,
        expiresIn: "3d",
      },
    );

    if (!user._id) throw new Error("Usuário não encontrado.");
    await this.mongoUsersRepository.editUserById(user._id, { token });

    const { name, role, subscriptionStatus, subscriberCode } = user;

    return {
      token,
      user: {
        id: user._id,
        email,
        name,
        role,
        subscriptionStatus,
        subscriberCode,
      },
    };
  }
}
