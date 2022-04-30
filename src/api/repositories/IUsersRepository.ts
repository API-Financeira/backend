import { IRoles } from "../enums/Roles";
import { IUser } from "../interfaces/User";
import { IUserUpdateFields } from "../interfaces/UserUpdate";

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  subscriberCode: string;
  subscriptionStatus: string;
  role: IRoles;
}
export interface IUsersRepository {
  createUser(user: ICreateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  editUserById(id: string, fields: IUserUpdateFields): Promise<IUser | null>;
  listUsers(): Promise<IUser[] | null>;
}
