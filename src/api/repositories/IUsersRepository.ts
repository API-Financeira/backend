import { IRoles } from "../enums/Roles";
import { IUser } from "../interfaces/User";

export interface ICreateUser {
  email: string;
  password: string;
  subscriberCode: string;
  subscriptionStatus: string;
  role: IRoles;
}
export interface IUsersRepository {
  createUser(user: ICreateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
