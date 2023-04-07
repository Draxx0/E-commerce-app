import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo/logo.webp";
import { useRouter } from "next/router";
import TokenService from "@/services/Token.service";

const AdminHeader = () => {
  const router = useRouter();

  return (
    <nav className="admin-nav">
      <Image
        src={Logo}
        alt="logo"
        width={100}
        height={100}
        className="admin-logo"
        onClick={() => router.push("/admin")}
      />

      <ul className="admin-link-list">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/products">Produits</Link>
        </li>
        <li>
          <Link href="/admin/categories">Catégories</Link>
        </li>
        <li>
          <Link href="/admin/orders">Commandes</Link>
        </li>
        <li>
          <Link
            href="/"
            onClick={() => TokenService.removeTokenFromLocalStorage()}
          >
            Retour au Site
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;
