import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IResetPasswordDTO } from "./ResetPasswordDTO";

export class ResetPasswordUseCase {
  constructor(private mongoUsersRepository: IUsersRepository) {}

  async execute({ email, password, token }: IResetPasswordDTO) {
    const user = await this.mongoUsersRepository.findByEmail(email);
    if (!user || !user._id) throw new Error("Usuário não encontrado.");

    try {
      verify(token, `${process.env.JWT_SECRET}`);
    } catch {
      throw new Error("Token inválido ou expirado!");
    }

    if (token !== user.passwordResetToken)
      throw new Error("Token inválido ou expirado!");

    const passwordHashed = await hash(password as string, 8);

    await this.mongoUsersRepository.editUserById(user._id, {
      password: passwordHashed,
    });
  }
}
