import { Request, Response } from "express";

import { EditPasswordUseCase } from "./EditPasswordUseCase";

export class EditPasswordController {
  constructor(private editPasswordUseCase: EditPasswordUseCase) {}

  async handle(request: Request, response: Response) {
    const { editUserId, oldPassword, newPassword } = request.body;
    const { userId } = response.locals;

    await this.editPasswordUseCase.execute(
      userId,
      editUserId,
      oldPassword,
      newPassword,
    );
    return response.status(204).end();
  }
}
