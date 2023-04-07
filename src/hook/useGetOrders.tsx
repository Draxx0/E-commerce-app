import { findAll } from "@/functions/findAll";
import { ICategory } from "@/types/category.type";
import { IOrders } from "@/types/orders.type";
import { IProduct } from "@/types/product.type";
import { useEffect, useState } from "react";

type Data = {
  orders: IOrders[];
  setOrders: React.Dispatch<React.SetStateAction<IOrders[]>>;
};

const useGetOrders = (): Data => {
  const [orders, setOrders] = useState<IOrders[]>([]);

  const getDataFromApi = async () => {
    const response = (await findAll("orders")) as IOrders[];
    console.log(response);
    setOrders(response);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return { orders, setOrders };
};

export default useGetOrders;
