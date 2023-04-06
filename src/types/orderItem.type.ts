import { IProduct } from "./product.type";
import { Timestamp } from "./timestamp.type";

export interface IOrderItems extends Timestamp {
  id: string;
  quantity: number;
  product: IProduct;
}
