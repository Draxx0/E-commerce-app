import { IProduct } from "@/types/product.type";

export const randomizeFunction = (arr: IProduct[], slice: number) => {
  return arr.sort(() => 0.5 - Math.random()).slice(0, slice);
};
