import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import { findAll } from "@/functions/findAll";
import useGetProducts from "@/hook/useGetProducts";
import AdminLayout from "@/layout/AdminLayout";
import { IProduct } from "@/types/product.type";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProductsAdminPage = () => {
  const { products, setProducts } = useGetProducts();
  const router = useRouter();

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  const handleDeleteProduct = async (product: IProduct) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`, {
        method: "DELETE",
      });
      const categoriesData = (await findAll("products")) as IProduct[];
      setProducts(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <h1>Products Admin Page</h1>

      <div className="admin-grid">
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>Description : {product.description}</p>
            <p>{product.price} €</p>
            <p>
              Catégorie :{" "}
              {product.category
                ? product.category.title
                : "Pas de catégory pour ce produit"}
            </p>
            <div className="row gap-1">
              <button
                className="action-button"
                onClick={() => router.push(`products/form/${product.id}`)}
              >
                Modifier
              </button>
              <button
                className="action-button-border"
                onClick={() => handleDeleteProduct(product)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link className="action-button" href={"/admin/products/form"}>
        Ajouter un produit
      </Link>
    </AdminLayout>
  );
};

export default ProductsAdminPage;
