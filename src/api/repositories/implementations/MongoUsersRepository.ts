import { IUser } from "../../interfaces/User";
import User from "../../models/User";
import { ICreateUser, IUsersRepository } from "../IUsersRepository";

export class MongoUsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<IUser> {
    const userFind = await User.findOne({ email });
    return userFind;
  }

  public async createUser(user: ICreateUser): Promise<IUser> {
    const userCreated = await User.create(user);
    return userCreated;
  }
}
