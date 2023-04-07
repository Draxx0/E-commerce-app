import { findAll } from "@/functions/findAll";
import { ICategory } from "@/types/category.type";
import { useEffect, useState } from "react";

type Data = {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};

const useGetCategories = (): Data => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getDataFromApi = async () => {
    const response = (await findAll("categories")) as ICategory[];
    setCategories(response);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return { categories, setCategories };
};

export default useGetCategories;
