import BackTo from "@/components/BackTo";
import ProductCard from "@/components/ProductCard";
import { ICategory } from "@/types/category.type";
import { IProduct } from "@/types/product.type";
import { GetStaticProps } from "next";

const ProductsPage = ({ products }: { products: IProduct[] }) => {
  return (
    <>
      <BackTo returnPath={"l'accueil"} />
      <h1 className="page-title">Voici tous les produits</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
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
