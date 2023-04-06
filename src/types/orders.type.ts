import { IOrderItems } from "./orderItem.type";
import { Status } from "./status.enum";
import { Timestamp } from "./timestamp.type";
import { IUser } from "./user.type";

export interface IOrders extends Timestamp {
  id: string;
  status: Status;
  user: IUser;
  totalPrice: number;
  orderItems: IOrderItems[];
}
