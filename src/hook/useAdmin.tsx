import { ICategory } from "@/types/category.type";
import { IProduct } from "@/types/product.type";
import { useEffect, useState } from "react";

type AdminData = {
  returnValue: [ICategory[], IProduct[]];
};

const useAdmin = (url: string): AdminData => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getDataFromApi = async () => {
    if (url === "categories" || url === "products") {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`);
      const data = await response.json();
      if (url === "categories") {
        setCategories(data);
      } else if (url === "products") {
        setProducts(data);
      }
    }

    if (url === "all") {
      const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      const categoriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      const data = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
      ]);

      setProducts(data[0]);
      setCategories(data[1]);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return { returnValue: [categories, products] };
};

export default useAdmin;
