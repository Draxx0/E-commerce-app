import AdminHeader from "@/components/AdminHeader";
import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
};

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <AdminHeader />

      <main className="admin-main">{children}</main>
    </>
  );
};

export default AdminLayout;
