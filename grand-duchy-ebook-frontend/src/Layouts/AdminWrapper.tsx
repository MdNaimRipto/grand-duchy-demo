import Loader from "@/common/loader/Loader";
import { useUserContext } from "@/context/AuthContext";
import { IUser } from "@/types/userTypes";
import { UseCommonImports } from "@/utils/UseCommonImports";
import React, { ReactElement, useEffect, useState } from "react";

const AdminWrapper = ({ children }: { children: ReactElement }) => {
  const { user, setUser } = useUserContext();
  const { Cookies, Router } = UseCommonImports();

  const typedUser = user as IUser;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || typedUser?.userType !== "ADMIN") {
      setUser(null);
      Cookies.remove("userData");
      Cookies.remove("token");
      Router.replace("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [Cookies, Router, setUser, typedUser, user]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminWrapper;
