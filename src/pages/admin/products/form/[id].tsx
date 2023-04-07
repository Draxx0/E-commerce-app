import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import useGetCategories from "@/hook/useGetCategories";
import useGetProducts from "@/hook/useGetProducts";
import AdminLayout from "@/layout/AdminLayout";
import { ProductUpdateType } from "@/types/product.update.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductFormUpdate = () => {
  const [credentials, setCredentials] = useState<ProductUpdateType>({});
  const [productName, setProductName] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;
  const { products } = useGetProducts();
  const { categories } = useGetCategories();

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setCredentials({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category ? product.category.id : "",
      });
      setProductName(product.title);
    }
  }, [id, products]);

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "PUT",
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
  return (
    <AdminLayout>
      <h1>Mettre à jour {productName}</h1>

      <form className="admin-form" onSubmit={handleSubmitNewProduct}>
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

        <div className="form-group">
          <label htmlFor="image">Image du produit</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="pour l'instant multer n'est pas mis en place donc le lien doit être : https://via.placeholder.com/200"
            onChange={handleSetCredentials}
            value={credentials.image || ""}
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
            value={credentials.price}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie du produit</label>
          <select
            name="category"
            id="category"
            defaultValue={credentials.category}
            value={credentials.category}
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
          Modfier le produit
        </button>
      </form>
    </AdminLayout>
  );
};

export default ProductFormUpdate;
