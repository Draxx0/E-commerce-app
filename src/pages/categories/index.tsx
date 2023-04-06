import BackTo from "@/components/BackTo";
import CategoryCard from "@/components/CategoryCard";
import Layout from "@/layout/Layout";
import { ICategory } from "@/types/category.type";
import { IOrders } from "@/types/orders.type";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const CategoriesPage = ({
  categories,
  order,
}: {
  categories: ICategory[];
  order: IOrders;
}) => {
  const router = useRouter();
  return (
    <Layout order={order}>
      <BackTo />
      <h1 className="page-title">Toutes les Categories</h1>

      <div className="grid">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </Layout>
  );
};

export default CategoriesPage;

export const getStaticProps: GetStaticProps<{
  categories: ICategory[];
}> = async () => {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const data = await categoriesRes.json();
  const categories: ICategory[] = data;

  const resOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
  const orders = await resOrders.json();
  const order = orders[0];

  return {
    props: {
      categories,
      order,
    },
    revalidate: 20,
  };
};
