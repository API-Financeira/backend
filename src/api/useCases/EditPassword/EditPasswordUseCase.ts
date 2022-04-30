import { hash } from "bcrypt";

import { IBcryptProvider } from "../../providers/IBcryptProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class EditPasswordUseCase {
  constructor(
    private mongoUsersRepository: IUsersRepository,
    private bcryptProvider: IBcryptProvider,
  ) {}

  async execute(
    userId: string,
    editUserId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const userAuthenticated = await this.mongoUsersRepository.findById(userId);
    const editUser = await this.mongoUsersRepository.findById(editUserId);

    if (!userAuthenticated || !editUser) throw new Error("Usuário invalido.");

    if (editUser._id?.toString() !== userId)
      throw new Error("Você não tem essa permissão.");

    if (newPassword.length < 5)
      throw new Error("Insira uma senha com no mínimo 5 caracteres.");
    if (newPassword.length > 18)
      throw new Error("Insira uma senha com no máximo 18 caracteres.");

    const compareOldPassword = await this.bcryptProvider.compare(
      oldPassword,
      editUser.password as string,
    );
    if (!compareOldPassword) throw new Error("As senha são diferentes.");

    const newPasswordHashed = await hash(newPassword, 8);
    await this.mongoUsersRepository.editUserById(editUserId, {
      password: newPasswordHashed,
    });
  }
}
