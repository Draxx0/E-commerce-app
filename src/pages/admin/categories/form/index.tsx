import AdminLayout from "@/layout/AdminLayout";
import { CategoryCreateType } from "@/types/category.create.type";
import { useRouter } from "next/router";
import { useState } from "react";

const CategoriesForm = () => {
  const [credentials, setCredentials] = useState<CategoryCreateType>({
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleSetCredentials = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmitNewCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      setCredentials({ title: "", description: "" });

      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <h1>Ajouter une catégorie</h1>

      <form className="admin-form" onSubmit={handleSubmitNewCategory}>
        <div className="form-group">
          <label htmlFor="title">Titre de la catégorie</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleSetCredentials}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description de la catégorie</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            cols={10}
            onChange={handleSetCredentials}
            required
          />
        </div>

        <button className="action-button" type="submit">
          Ajouter la catégorie
        </button>
      </form>
    </AdminLayout>
  );
};

export default CategoriesForm;
