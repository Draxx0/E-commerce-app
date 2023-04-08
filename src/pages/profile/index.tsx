import { UserContext } from "@/contexts/UserContext";
import useGetOrders from "@/hook/useGetOrders";
import Layout from "@/layout/Layout";
import TokenService from "@/services/Token.service";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  address?: string;
}

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const { orders } = useGetOrders();
  const [isUpdatable, setIsUpdatable] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<IUserUpdate>({
    username: user?.username,
    email: user?.email,
    address: user?.address,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(credentials),
        }
      );
      const userJson = await response.json();
      const { access_token } = userJson;
      TokenService.setTokenInLocalStorage(access_token);
      const newUser: any = TokenService.getUserFromLocalToken();
      setUser(newUser);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout order={orders[0]}>
      <div className="profile">
        <h1 className="page-title">Mon profil</h1>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="username">Prénom</label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              disabled={!isUpdatable}
              onChange={handleChange}
            />
            <button
              type="button"
              className="action-button-border"
              onClick={() => setIsUpdatable(!isUpdatable)}
            >
              Modifier l&apos;adresse email
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="address">Addresse</label>
            <input
              type="text"
              name="address"
              id="address"
              value={credentials.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="action-button">
            Mettre à jour
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
