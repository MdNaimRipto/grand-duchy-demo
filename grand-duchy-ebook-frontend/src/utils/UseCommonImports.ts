import { useRouter } from "next/router";
import Cookies from "js-cookie";

export function UseCommonImports() {
  const router = useRouter();

  return {
    Router: router,
    Cookies: Cookies,
  };
}
