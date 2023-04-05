import Image from "next/image";
import Logo from "../assets/logo/logo.webp";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();

  return (
    <nav>
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
          <Link href="/cart">
            Mon Panier{" "}
            <div className="svg-wrapper">
              <div className="cart-item">2</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
