import { IUser } from "../../interfaces/User";
import { IUserUpdateFields } from "../../interfaces/UserUpdate";
import User from "../../models/User";
import { ICreateUser, IUsersRepository } from "../IUsersRepository";

export class MongoUsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<IUser> {
    const userFind = await User.findOne({ email });
    return userFind;
  }

  public async findById(id: string): Promise<IUser> {
    const userFind = await User.findById({ _id: id });
    return userFind;
  }

  public async createUser(user: ICreateUser): Promise<IUser> {
    const userCreated = await User.create(user);
    return userCreated;
  }

  public async editUserById(
    id: string,
    fields: IUserUpdateFields,
  ): Promise<IUser> {
    const userEdited = await User.findByIdAndUpdate(id, {
      ...fields,
    });
    return userEdited;
  }

  public async listUsers() {
    const users = User.find();
    return users;
  }
}
