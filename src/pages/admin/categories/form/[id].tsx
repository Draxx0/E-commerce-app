import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import useGetCategories from "@/hook/useGetCategories";
import AdminLayout from "@/layout/AdminLayout";
import { CategoryUpdateType } from "@/types/category.update.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoryFormUpdate = () => {
  const [credentials, setCredentials] = useState<CategoryUpdateType>({});
  const [categoryName, setCategoryName] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;
  const { categories } = useGetCategories();

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  useEffect(() => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      setCredentials({
        title: category.title,
        description: category.description,
      });
      setCategoryName(category.title);
    }
  }, [id, categories]);

  const handleSetCredentials = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmitNewCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <h1>Mettre à jour {categoryName}</h1>

      <form className="admin-form" onSubmit={handleSubmitNewCategory}>
        <div className="form-group">
          <label htmlFor="title">Titre du produit</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleSetCredentials}
            value={credentials.title || ""}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description du produit</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            cols={10}
            onChange={handleSetCredentials}
            value={credentials.description || ""}
            required
          />
        </div>

        <button className="action-button" type="submit">
          Modfier la categorie
        </button>
      </form>
    </AdminLayout>
  );
};

export default CategoryFormUpdate;
