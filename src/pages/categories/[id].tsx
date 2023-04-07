import { GetStaticPaths, GetStaticProps } from "next";
import { ICategory } from "@/types/category.type";
import ProductCard from "@/components/ProductCard";
import BackTo from "@/components/BackTo";
import Layout from "@/layout/Layout";
import { IOrders } from "@/types/orders.type";

const CategoryDetail = ({
  category,
  order,
}: {
  category: ICategory;
  order: IOrders;
}) => {
  return (
    <Layout order={order}>
      <div className="category-detail">
        <BackTo />
        <h1 className="category-detail__title">Catégorie : {category.title}</h1>
        <p className="category-detail__description">{category.description}</p>

        <h2>
          Tous les produits de la catégorie {category.title} -{" "}
          <small>{category.products.length} produits</small>
        </h2>
        <div className="grid">
          {category.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const categories = await res.json();
  const paths = categories.map((category: ICategory) => ({
    params: { id: category.id },
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
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}`
  );
  const category = await res.json();

  const resOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
  const orders = await resOrders.json();
  const orderData = orders[0];
  const order = orderData ? orderData : null;

  return { props: { category, order } };
};
