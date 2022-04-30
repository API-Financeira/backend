import { Request, Response } from "express";

import { IRoles } from "../../enums/Roles";
import { ApprovedPurchaseUseCase } from "./ApprovedPurchaseUseCase";

interface IBody {
  data: {
    subscription: {
      subscriber: {
        code: string;
      };
      plan: {
        name: IRoles;
      };
      status: string;
    };
    buyer: {
      email: string;
    };
  };
}

export class ApprovedPurchaseController {
  constructor(private signUpUseCase: ApprovedPurchaseUseCase) {}

  async handle(request: Request, response: Response) {
    const {
      data: { subscription, buyer },
    } = <IBody>request.body;
    const { "x-hotmart-hottok": hotmartHotTok } = request.headers;

    const password = Math.random().toString(36).slice(2, 15);

    const user = await this.signUpUseCase.execute({
      email: buyer.email,
      password,
      role: subscription.plan.name,
      subscriberCode: subscription.subscriber.code,
      subscriptionStatus: subscription.status,
      hotmartHotTok: hotmartHotTok as string,
    });

    return response.status(201).json({
      success: true,
      user,
    });
  }
}
