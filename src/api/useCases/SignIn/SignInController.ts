import { Request, Response } from "express";

import { SignInUseCase } from "./SignInUseCase";

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const token = await this.signInUseCase.execute({
      email,
      password,
    });

    return response.status(200).json({
      success: true,
      data: token,
    });
  }
}
