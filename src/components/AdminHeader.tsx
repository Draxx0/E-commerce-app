import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo/logo.webp";

const AdminHeader = () => {
  return (
    <nav className="admin-nav">
      <Image
        src={Logo}
        alt="logo"
        width={100}
        height={100}
        className="admin-logo"
      />

      <ul className="admin-link-list">
        <li>
          <Link href="/admin/products">Produits</Link>
        </li>
        <li>
          <Link href="/admin/categories">Catégories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;
