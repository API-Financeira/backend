import { IHotmartToken } from "../../interfaces/HotmartToken";
import HotmartToken from "../../models/HotmartToken";
import { IHotmartTokenRepository } from "../IHotmartTokenRepository";

export class MongoHotmartTokenRepository implements IHotmartTokenRepository {
  public async findByKey(key: string): Promise<IHotmartToken> {
    const tokenFind = await HotmartToken.findOne({ key });
    return tokenFind;
  }

  public async updateToken(id: string, token: string): Promise<IHotmartToken> {
    const tokenEdited = await HotmartToken.findByIdAndUpdate(id, {
      token,
    });
    return tokenEdited;
  }
}
