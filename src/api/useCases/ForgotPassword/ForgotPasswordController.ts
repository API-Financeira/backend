import { Request, Response } from "express";

import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async handle(request: Request, response: Response) {
    const { email } = request.body;

    await this.forgotPasswordUseCase.execute(email);
    return response.status(204).end();
  }
}
