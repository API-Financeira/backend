import { JwtPayload, verify } from "jsonwebtoken";

interface IResetTokenPayload extends JwtPayload {
  email: string;
}

export class CheckResetTokenUseCase {
  async execute(token: string) {
    try {
      const { email } = <IResetTokenPayload>(
        verify(token, `${process.env.JWT_SECRET}`)
      );
      return email;
    } catch (error) {
      throw new Error("Toxen expirado ou invalido.");
    }
  }
}
