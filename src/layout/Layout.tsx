import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { IOrders } from "@/types/orders.type";
import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
  order: IOrders | null;
};

const Layout: FC<IProps> = ({ children, order }) => {
  return (
    <>
      <Header order={order} />

      <main className="main">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
