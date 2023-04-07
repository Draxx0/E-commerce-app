import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import useGetCategories from "@/hook/useGetCategories";
import useGetProducts from "@/hook/useGetProducts";
import AdminLayout from "@/layout/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { categories } = useGetCategories();
  const { products } = useGetProducts();
  const router = useRouter();

  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  return (
    <AdminLayout>
      <h1 className="page-title">Admin Dashboard</h1>

      <h2 className="admin-h2">Les 3 dernières catégories :</h2>
      <div className="admin-grid">
        {categories.slice(categories.length - 1, 3).map((category) => (
          <div key={category.id}>
            <p>{category.title}</p>
            <button
              className="action-button"
              onClick={() =>
                router.push(`/admin/categories/form/${category.id}`)
              }
            >
              Modifier
            </button>
          </div>
        ))}
      </div>

      <h2 className="admin-h2">Les 3 derniers produits :</h2>
      <div className="admin-grid">
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <button
              className="action-button"
              onClick={() => router.push(`/admin/products/form/${product.id}`)}
            >
              Modifier
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
