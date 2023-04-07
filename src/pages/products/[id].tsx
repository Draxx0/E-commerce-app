import { IProduct } from "@/types/product.type";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { randomizeFunction } from "@/functions/randomizeFunction";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import BackTo from "@/components/BackTo";
import Layout from "@/layout/Layout";
import { IOrders } from "@/types/orders.type";
import { ProtectedRoute } from "@/functions/protectedRoute";
import { useRouter } from "next/router";
import { ProtectedAction } from "@/functions/protectedAction";
import TokenService from "@/services/Token.service";

const ProductDetail = ({ product }: { product: IProduct }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [order, setOrder] = useState<IOrders | null>(null);
  const router = useRouter();

  const getProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const products = await res.json();
    const productsWithoutCurrent = products.filter(
      (p: IProduct) => p.id !== product.id
    );
    const randomProducts = randomizeFunction(productsWithoutCurrent, 3);
    setProducts(randomProducts);
  };

  const getOrder = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    const data = await response.json();
    setOrder(data[0]);
  };

  const handleAddToCart = async () => {
    try {
      ProtectedAction(router);
      if (order) {
        const orderItemResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`,
            },
            body: JSON.stringify({
              product: product.id,
              quantity: 1,
              order: order.id,
            }),
          }
        );
        await orderItemResponse.json();
        getOrder();
      } else {
        const orderResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`,
            },
            body: JSON.stringify({
              user: "5835545b-1280-4969-b9eb-50323c5b1924",
              orderItems: [
                {
                  product: product.id,
                  quantity: 1,
                },
              ],
            }),
          }
        );
        await orderResponse.json();

        getOrder();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Layout order={order}>
      <div className="product-detail">
        <BackTo />
        <div className="product-detail__img">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="product-detail__img__tag"
          />
        </div>
        <div className="product-detail__content">
          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__price">{product.price} €</p>
          <p className="product-detail__category">
            Catégorie : {product.category.title}
          </p>
          <button className="action-button" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>

        {products.length > 0 && (
          <div className="product-detail__related">
            <h2 className="product-detail__related__title">
              Vous aimerez peut-être aussi
            </h2>
            <div className="grid">
              {products.map((product: IProduct) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  const products = await res.json();
  const paths = products.map((product: IProduct) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false };
};

//! QUAND JE TYPE GETSTATICPROPS, UNE ERREUR SURVIENT A DEBUG.
export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );
  const product = await res.json();

  return { props: { product } };
};
