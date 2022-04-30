import { IRoles } from "../../enums/Roles";

export interface IApprovedPurchase {
  email: string;
  subscriberCode: string;
  subscriptionStatus: string;
  password: string;
  role: IRoles;
  hotmartHotTok: string;
}
