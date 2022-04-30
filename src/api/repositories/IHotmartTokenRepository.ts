import { IHotmartToken } from "../interfaces/HotmartToken";

export interface IHotmartTokenRepository {
  findByKey(key: string): Promise<IHotmartToken | null>;
  updateToken(id: string, token: string): Promise<IHotmartToken | null>;
}
