import { IProduct } from "./product.type";
import { Timestamp } from "./timestamp.type";

export interface ICategory extends Timestamp {
  id: string;
  title: string;
  description: string;
  products: IProduct[];
}
