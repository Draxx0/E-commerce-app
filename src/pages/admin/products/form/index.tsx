import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import useGetCategories from "@/hook/useGetCategories";
import AdminLayout from "@/layout/AdminLayout";
import { CategoryCreateType } from "@/types/category.create.type";
import { ProductCreateType } from "@/types/product.create.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductForm = () => {
  const [credentials, setCredentials] = useState<ProductCreateType>({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });

  const { categories } = useGetCategories();

  const router = useRouter();

  const handleSetCredentials = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmitNewProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      credentials.price = Number(credentials.price);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      router.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  return (
    <AdminLayout>
      <h1>Ajouter un produit</h1>

      <form className="admin-form" onSubmit={handleSubmitNewProduct}>
        <div className="form-group">
          <label htmlFor="title">Titre du produit</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleSetCredentials}
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image du produit</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="pour l'instant multer n'est pas mis en place donc le lien doit être : https://via.placeholder.com/200"
            onChange={handleSetCredentials}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix unitaire du produit</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={handleSetCredentials}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie du produit</label>
          <select
            name="category"
            id="category"
            defaultValue={"default"}
            onChange={handleSetCredentials}
          >
            <option value="default" disabled hidden>
              {" "}
              Sélectionner une catégorie{" "}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <button className="action-button" type="submit">
          Ajouter le produit
        </button>
      </form>
    </AdminLayout>
  );
};

export default ProductForm;
