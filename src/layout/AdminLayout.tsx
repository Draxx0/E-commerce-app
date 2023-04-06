import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
};

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}

      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
