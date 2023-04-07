import useGetCategories from "@/hook/useGetCategories";
import useGetProducts from "@/hook/useGetProducts";
import AdminLayout from "@/layout/AdminLayout";
import TokenService from "@/services/Token.service";
import { IProduct } from "@/types/product.type";
import { UserToken } from "@/types/token.type";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface IUserData {
  username: string;
  password: string;
}

const AdminPage = () => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleSetUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleConnectAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const userAdminJson = await response.json();
      const { access_token } = userAdminJson;
      TokenService.setTokenInLocalStorage(access_token);
      const token = TokenService.getUserFromLocalToken();
      const isToken = token?.role === "admin";
      if (isToken) {
        router.push("/admin/dashboard");
      } else {
        setTimeout(() => {
          setError(true);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-signup">
      <form className="admin-form" onSubmit={handleConnectAdmin}>
        <h1 className="page-title">Admin Access</h1>

        <div className="form-group">
          <label htmlFor="username">Pseudonyme</label>
          <input
            type="username"
            name="username"
            id="username"
            onChange={handleSetUserData}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleSetUserData}
          />
        </div>

        {error && (
          <p className="error-message">
            Votre identifiant ou mot de passe est incorrect, ou vous n&apos;avez
            simplement pas accès
          </p>
        )}

        <button type="submit" className="action-button">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
