import { useEffect } from "react";
import { decryptData, encryptData } from "@/components/auth/userEncription";
import { apiConfig } from "@/configs/apiConfig";
import { useUserContext } from "@/context/AuthContext";
import { UseCommonImports } from "@/utils/UseCommonImports";
import { signOut } from "next-auth/react";
import { SuccessToast } from "@/common/toasts/SuccessToast";
import { ErrorToast } from "@/common/toasts/ErrorToast";
import { ICreateUser, linkedProvidersEnums } from "@/types/userTypes";

export const useHandleProviderLogin = ({
  status,
  data,
  providerLoginEndpoint,
  authMethod,
}: {
  status: string;
  data: any;
  providerLoginEndpoint: string;
  authMethod: string;
}) => {
  const { setUser } = useUserContext();
  const { Cookies, Router } = UseCommonImports();

  useEffect(() => {
    const baseURL = apiConfig.BASE_URL;

    const queryParams = new URLSearchParams(window.location.search);
    const method = queryParams.get("method");

    if (status !== "loading" && method === authMethod) {
      if (data && status === "authenticated") {
        const encryptedUser = encryptData(data.user);

        window.sessionStorage.setItem(
          "tempProviderData",
          JSON.stringify(encryptedUser)
        );

        const option = {
          data: {
            userInfo: {
              userName: data.user?.name as string,
              email: data.user?.email as string,
            },
            authMethod: authMethod as linkedProvidersEnums,
          },
        };

        const checkProviderLogin = async ({
          data,
        }: {
          data: {
            userInfo: ICreateUser;
            authMethod: linkedProvidersEnums;
          };
        }) => {
          const res = await fetch(`${baseURL}${providerLoginEndpoint}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const result = await res.json();
          if (result.success) {
            SuccessToast(result.message);
            const userData = decryptData(String(result.data?.userData));
            setUser(userData);

            Cookies.set("userData", String(result.data?.userData), {
              expires: 3,
            });
            Cookies.set("token", String(result.data?.token), { expires: 3 });

            signOut({ redirect: false });
            setTimeout(() => {
              Router.push("/");
            }, 500);
          }
          // else if (!result.success) {
          //   Router.push(`/auth/verify?tab=userRole&authMethod=${authMethod}`);
          //   SuccessToast("Please Fill The Info To Complete Login");
          // }
          else {
            ErrorToast("Failed To Login. Try Again!");
          }
        };

        checkProviderLogin(option);
      } else {
        window.sessionStorage.removeItem("tempProviderData");
      }
    }
  }, [
    Cookies,
    Router,
    providerLoginEndpoint,
    data,
    setUser,
    status,
    authMethod,
  ]);
};
