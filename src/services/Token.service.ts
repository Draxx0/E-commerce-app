import jwtDecode from "jwt-decode";
import { IToken, UserToken } from "../types/token.type";

const setTokenInLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

const getTokenFromLocalStorageAdmin = () => {
  const accessToken = localStorage.getItem("accessTokenAdmin");
  return accessToken;
};

const isValidToken = (accessToken: string) => {
  const decodedToken: IToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const getUserFromLocalToken = (): UserToken | null => {
  const accessToken = getTokenFromLocalStorage();
  if (!accessToken) return null;
  const isValid = isValidToken(accessToken);
  if (!isValid) return null;
  return jwtDecode(accessToken);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
};

const TokenService = {
  setTokenInLocalStorage,
  getUserFromLocalToken,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  getTokenFromLocalStorageAdmin,
};

export default TokenService;
