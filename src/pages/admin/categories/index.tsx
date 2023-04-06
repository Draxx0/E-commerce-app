import { useEffect, useState } from "react";
import { ICategory } from "@/types/category.type";

const CategoriesAdminPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h1>Categories Admin Page</h1>

      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.title}</h2>
          <p>{category.description}</p>
        </div>
      ))}
    </>
  );
};

export default CategoriesAdminPage;
