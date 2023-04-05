import Image from "next/image";
import Logo from "../assets/logo/logo.webp";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <Image
        src={Logo}
        alt="Logo"
        className="logo"
        onClick={() => router.push("/")}
      />

      <ul className="nav-list">
        <li className="nav-list__item">
          <Link href="/">Accueil</Link>
        </li>
        <li className="nav-list__item">
          <Link href="/products">Les produits</Link>
        </li>
        <li className="nav-list__item">
          <Link href="/categories">Les catégories</Link>
        </li>
        <li className="nav-list__item">
          <Link href="/cart">Mon Panier</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
