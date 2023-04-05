import { IProduct } from "@/types/product.type";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { randomizeFunction } from "@/functions/randomizeFunction";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = ({ product }: { product: IProduct }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const products = await res.json();
    const productsWithoutCurrent = products.filter(
      (p: IProduct) => p.id !== product.id
    );
    const randomProducts = randomizeFunction(productsWithoutCurrent, 3);
    setProducts(randomProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <div className="product-detail">
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
        <button className="action-button">Ajouter au panier</button>
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
