import { ICategory } from "./category.type";
import { Timestamp } from "./timestamp.type";

export interface IProduct extends Timestamp {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: ICategory;
}
