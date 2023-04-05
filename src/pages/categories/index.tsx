import BackTo from "@/components/BackTo";
import CategoryCard from "@/components/CategoryCard";
import { ICategory } from "@/types/category.type";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const CategoriesPage = ({ categories }: { categories: ICategory[] }) => {
  const router = useRouter();
  return (
    <>
      <BackTo returnPath={"l'accueil"} />
      <h1 className="page-title">Categories</h1>

      <div className="grid">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </>
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

  return {
    props: {
      categories,
    },
    revalidate: 20,
  };
};
