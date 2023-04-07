import TokenService from "@/services/Token.service";
import { NextRouter } from "next/router";

export const ProtectedRoute = (router: NextRouter, route: string) => {
  const isToken = TokenService.getTokenFromLocalStorage();
  !isToken ? router.push("/auth/signin") : router.push(route);
};
