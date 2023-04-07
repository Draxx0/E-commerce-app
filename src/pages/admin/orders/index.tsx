import { AdminProtectedRoute } from "@/functions/adminProtectedRoute";
import useGetCategories from "@/hook/useGetCategories";
import useGetOrders from "@/hook/useGetOrders";
import useGetProducts from "@/hook/useGetProducts";
import AdminLayout from "@/layout/AdminLayout";
import { IOrders } from "@/types/orders.type";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OrdersAdminPage = () => {
  const { orders } = useGetOrders();

  const router = useRouter();
  useEffect(() => {
    AdminProtectedRoute(router);
  }, [router]);

  return (
    <AdminLayout>
      <h1>Commandes</h1>

      <h2>Commandes en cours</h2>
      <div className="admin-grid">
        {orders
          .filter((order: IOrders) => order.status === "INCARD")
          .map((order) => (
            <div className="admin-card" key={order.id}>
              <h2>Commande n°{order.id}</h2>
            </div>
          ))}
      </div>

      <h2>Commandes complétés</h2>
      <div className="admin-grid">
        {orders
          .filter((order: IOrders) => order.status === "COMPLETED")
          .map((order) => (
            <div className="admin-card" key={order.id}>
              <h2>Commande n°{order.id}</h2>
            </div>
          ))}
      </div>
    </AdminLayout>
  );
};

export default OrdersAdminPage;
