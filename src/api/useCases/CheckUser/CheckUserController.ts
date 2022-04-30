import { Request, Response } from "express";

import { CheckUseCase } from "./CheckUserUseCase";

export class CheckUserController {
  constructor(private checkUseCase: CheckUseCase) {}

  async handle(request: Request, response: Response) {
    const { userId, token } = response.locals;

    const user = await this.checkUseCase.execute(userId, token);
    return response.status(200).json({
      success: true,
      user,
    });
  }
}
