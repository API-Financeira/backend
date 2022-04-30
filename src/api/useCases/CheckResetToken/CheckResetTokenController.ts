import { Request, Response } from "express";

import { CheckResetTokenUseCase } from "./CheckResetTokenUseCase";

export class CheckResetTokenController {
  constructor(private checkResetTokenUseCase: CheckResetTokenUseCase) {}

  async handle(request: Request, response: Response) {
    const authHeader = request.headers.authorization;
    const [, token] = authHeader ? authHeader.split(" ") : [];

    const email = await this.checkResetTokenUseCase.execute(token);
    return response.status(200).json({
      success: true,
      email,
    });
  }
}
