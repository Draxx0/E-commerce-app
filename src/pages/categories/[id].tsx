import { GetStaticPaths, GetStaticProps } from "next";
import { ICategory } from "@/types/category.type";

const CategoryDetail = ({ category }: { category: ICategory }) => {
  return (
    <div className="category-detail">
      <h1>{category.title}</h1>
    </div>
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

  return { props: { category } };
};
