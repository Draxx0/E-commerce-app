import TokenService from "@/services/Token.service";
import { NextRouter } from "next/router";

export const AdminProtectedRoute = (router: NextRouter) => {
  const token = TokenService.getTokenFromLocalStorage();
  const isToken = TokenService.getUserFromLocalToken();
  isToken?.role !== "admin" && router.push("/admin");
};
