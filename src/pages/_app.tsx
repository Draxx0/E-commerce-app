import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import "../styles/Header.css";
import "../styles/Footer.css";
import "../styles/ProductCard.css";
import "../styles/CategoryCard.css";
import "../styles/ProductDetail.css";
import "../styles/CategoryDetail.css";
import "../styles/CartPage.css";
import "../styles/AdminHeader.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
