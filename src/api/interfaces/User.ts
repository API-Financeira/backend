import { IRoles } from "../enums/Roles";

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  passwordResetToken?: string;
  subscriberCode: string;
  subscriptionStatus: string;
  token?: string;
  role: IRoles;
}