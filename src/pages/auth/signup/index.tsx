import Layout from "@/layout/Layout";
import { IOrders } from "@/types/orders.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Signin = () => {
  const [order, setOrder] = useState<IOrders | null>(null);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const getOrder = async () => {
    const resOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    const orders = await resOrders.json();
    const order = orders[0];
    setOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleSetUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout order={order}>
      <div className="signup">
        <h1>Inscription</h1>

        <form onSubmit={handleSignup}>
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
            <label htmlFor="email">Votre addresse email</label>
            <input
              type="email"
              name="email"
              id="email"
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

          <div className="form-group">
            <label htmlFor="address">Votre addresse</label>
            <input
              type="address"
              name="address"
              id="address"
              onChange={handleSetUserData}
            />
          </div>

          <button className="action-button" type="submit">
            Crée mon compte
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
