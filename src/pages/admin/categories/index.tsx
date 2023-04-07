import { useEffect, useState } from "react";
import { ICategory } from "@/types/category.type";
import AdminLayout from "@/layout/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import useGetCategories from "@/hook/useGetCategories";
import { findAll } from "@/functions/findAll";
import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";

const CategoriesAdminPage = () => {
  const router = useRouter();
  const { categories, setCategories } = useGetCategories();

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  const handleDeleteCategory = async (category: ICategory) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`,
        {
          method: "DELETE",
        }
      );

      const categoriesData = (await findAll("categories")) as ICategory[];
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <h1>Category Admin Page</h1>

      <div className="admin-grid">
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <div className="row gap-1">
              <button
                className="action-button"
                onClick={() => router.push(`categories/form/${category.id}`)}
              >
                Modifier
              </button>
              <button
                className="action-button-border"
                onClick={() => handleDeleteCategory(category)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link className="action-button" href={"/admin/categories/form"}>
        Ajouter une catégorie
      </Link>
    </AdminLayout>
  );
};

export default CategoriesAdminPage;
