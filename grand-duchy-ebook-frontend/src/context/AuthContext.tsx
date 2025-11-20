import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { decryptData } from "@/components/auth/userEncription";
import Loader from "@/common/loader/Loader";
import { apiConfig } from "@/configs/apiConfig";
import { IUser } from "@/types/userTypes";

interface UserContextType {
  user: null | any;
  setUser: Dispatch<SetStateAction<null | any>>;
  contextLoading: boolean;
  setContextLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  contextLoading: true,
  setContextLoading: () => {},
});

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [contextLoading, setContextLoading] = useState(true);

  const [user, setUser] = useState<null | any>(null);

  const getUserData = useCallback(() => {
    if (Cookies.get("userData")) {
      const value = Cookies.get("userData");
      const userData = decryptData(value as string);
      return userData;
    }
  }, []);

  useEffect(() => {
    const typedUser = getUserData() as IUser | null | undefined;
    if (!typedUser) return;

    const updateActiveTime = async () => {
      try {
        const res = await fetch(
          `${apiConfig.BASE_URL}${apiConfig.USER.UPDATE_ACTIVE_TIME}?email=${typedUser?.email}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        await res.json();
      } catch (error) {
        console.error("Error updating active time:", error);
      }
    };

    const interval = setInterval(() => {
      updateActiveTime();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [getUserData]);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, [getUserData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContextLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [contextLoading]);

  const value = {
    user: user ? user : null,
    setUser,
    contextLoading,
    setContextLoading,
  };

  if (contextLoading) {
    return <Loader />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AuthContext;

export function useUserContext(): UserContextType {
  return useContext(UserContext);
}
