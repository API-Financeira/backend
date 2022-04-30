import { Request, Response, Router } from "express";

import { approvedPurchaseController } from "../useCases/ApprovedPurchase";

const routes = Router();

routes.post("/approved_purchase", (request: Request, response: Response) => {
  return approvedPurchaseController.handle(request, response);
});

export { routes as webhookRouter };
