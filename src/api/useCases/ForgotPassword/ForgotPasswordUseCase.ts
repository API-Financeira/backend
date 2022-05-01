import { sign } from "jsonwebtoken";

import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ForgotPasswordUseCase {
  constructor(
    private mongoUsersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.mongoUsersRepository.findByEmail(email);
    if (!user || !user._id) throw new Error("Usuário não encontrado.");

    const token = sign(
      {
        email: user.email,
      },
      `${process.env.JWT_SECRET}`,
      {
        subject: `${user.email}`,
        expiresIn: "1h",
      },
    );

    await this.mongoUsersRepository.editUserById(user._id, {
      passwordResetToken: token,
    });

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: process.env.FROM_NAME || "No-reply",
        email: process.env.FROM_EMAIL || "noreply@gmail.com",
      },
      subject: "Forgot Password",
      body: `
        <body>
          <section>
              <a href="${process.env.APP_URL}/recovery/${token}" target="_blank">Trocar senha</a>
            </section>
        </body>
      `,
    });
  }
}
