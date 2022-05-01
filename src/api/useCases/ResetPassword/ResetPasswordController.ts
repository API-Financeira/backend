import { Request, Response } from "express";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async handle(request: Request, response: Response) {
    const { email, password, token } = request.body;

    await this.resetPasswordUseCase.execute({
      email,
      password,
      token,
    });
    return response.status(204).end();
  }
}
