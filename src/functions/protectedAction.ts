import TokenService from "@/services/Token.service";
import { NextRouter } from "next/router";

export const ProtectedAction = (router: NextRouter) => {
  const isToken = TokenService.getTokenFromLocalStorage();
  console.log("isToken", isToken);
  !isToken && router.push("/auth/signin");
};
