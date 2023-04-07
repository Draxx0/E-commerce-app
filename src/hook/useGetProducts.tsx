import { findAll } from "@/functions/findAll";
import { ICategory } from "@/types/category.type";
import { IProduct } from "@/types/product.type";
import { useEffect, useState } from "react";

type Data = {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const useGetProducts = (): Data => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getDataFromApi = async () => {
    const response = (await findAll("products")) as IProduct[];
    setProducts(response);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return { products, setProducts };
};

export default useGetProducts;
