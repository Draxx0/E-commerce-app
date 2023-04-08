import { UserContext } from "@/contexts/UserContext";
import useGetOrders from "@/hook/useGetOrders";
import Layout from "@/layout/Layout";
import TokenService from "@/services/Token.service";
import { IOrders } from "@/types/orders.type";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface IUserData {
  username: string;
  password: string;
}

const Signin = () => {
  const { orders } = useGetOrders();
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSetUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const userJson = await response.json();
      const { access_token } = userJson;
      TokenService.setTokenInLocalStorage(access_token);
      const user: any = TokenService.getUserFromLocalToken();
      setUser(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout order={orders[0]}>
      <div className="signin">
        <h1>Connexion</h1>

        <form onSubmit={handleLogin}>
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

          <button className="action-button" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
