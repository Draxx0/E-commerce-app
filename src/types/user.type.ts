import { Timestamp } from "./timestamp.type";

export interface IUser extends Timestamp {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
}
