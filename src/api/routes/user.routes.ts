import { Request, Response, Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { checkResetTokenController } from "../useCases/CheckResetToken";
import { checkUserController } from "../useCases/CheckUser";
import { editPasswordController } from "../useCases/EditPassword";
import { signInController } from "../useCases/SignIn";

const routes = Router();

routes.post("/signin", (request: Request, response: Response) => {
  return signInController.handle(request, response);
});

routes.get(
  "/check",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    return checkUserController.handle(request, response);
  },
);

routes.get("/check_reset_token", (request: Request, response: Response) => {
  return checkResetTokenController.handle(request, response);
});

routes.post(
  "/edit_password",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    return editPasswordController.handle(request, response);
  },
);

export { routes as userRouter };
