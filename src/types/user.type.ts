import { Timestamp } from "./timestamp.type";
import { UserRole } from "./user.role.enum";

export interface IUser extends Timestamp {
  id: number;
  username: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}
