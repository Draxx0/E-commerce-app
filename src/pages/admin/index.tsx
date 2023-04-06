import useAdmin from "@/hook/useAdmin";
import AdminLayout from "@/layout/AdminLayout";
import { IProduct } from "@/types/product.type";

const AdminPage = () => {
  const { returnValue } = useAdmin("all");
  const products = returnValue[1];
  const categories = returnValue[0];
  return (
    <AdminLayout>
      <h1 className="page-title">Admin Dashboard</h1>

      <h2 className="admin-h2">Catégories :</h2>
      <div className="admin-grid">
        {categories.map((category) => (
          <div key={category.id}>
            <p>{category.title}</p>
          </div>
        ))}
      </div>

      <h2 className="admin-h2">Produits :</h2>
      <div className="admin-grid">
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
