import BackTo from "@/components/BackTo";
import ProductCard from "@/components/ProductCard";
import Layout from "@/layout/Layout";
import { ICategory } from "@/types/category.type";
import { IOrders } from "@/types/orders.type";
import { IProduct } from "@/types/product.type";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

const ProductsPage = ({ products }: { products: IProduct[] }) => {
  const [order, setOrder] = useState<IOrders | null>(null);

  const getOrder = async () => {
    const resOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    const orders = await resOrders.json();
    const order = orders[0];
    setOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Layout order={order}>
      <BackTo />
      <h1 className="page-title">Voici tous les produits</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Layout>
  );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps<{
  products: IProduct[];
}> = async () => {
  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  const data = await productsRes.json();
  const products: IProduct[] = data;

  return {
    props: {
      products,
    },
    revalidate: 20,
  };
};
