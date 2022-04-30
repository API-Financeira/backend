import { Request, Response, Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { checkUserController } from "../useCases/CheckUser";
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

export { routes as userRouter };
