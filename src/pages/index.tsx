import Head from "next/head";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import { IProduct } from "@/types/product.type";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { ICategory } from "@/types/category.type";
import CategoryCard from "@/components/CategoryCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  products,
  categories,
}: {
  products: IProduct[];
  categories: ICategory[];
}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Healthe-e commerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>Bienvenue sur Health-e commerce 👨‍⚕️</h1>
        <section className="section-products">
          <h2 className="page-title">Découvrez nos trois derniers produits</h2>

          <div className="grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <button
            className="action-button"
            onClick={() => router.push("/products")}
          >
            Voir tous les produits
          </button>
        </section>

        <section className="section-categories">
          <div className="grid">
            {categories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
          <button
            className="action-button"
            onClick={() => router.push("/categories")}
          >
            Voir toutes les catégories
          </button>
        </section>
      </>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  products: IProduct[];
  categories: ICategory[];
}> = async () => {
  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  const productsData = await productsRes.json();
  const products: IProduct[] = productsData.slice(productsData.lenght - 1, 3);

  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const categoriesData = await categoriesRes.json();
  const categories: ICategory[] = categoriesData.slice(
    categoriesData.lenght - 1,
    3
  );

  return {
    props: {
      products,
      categories,
    },
    revalidate: 20,
  };
};
