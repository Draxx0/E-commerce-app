import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
};

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
