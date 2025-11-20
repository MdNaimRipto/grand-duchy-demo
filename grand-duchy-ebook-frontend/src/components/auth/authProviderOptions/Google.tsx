import React, { useState } from "react";
import Image from "next/image";
import googleLogo from "@/assets/images/google-logo.png";
import { signIn, useSession } from "next-auth/react";
import { apiConfig } from "@/configs/apiConfig";
import { useHandleProviderLogin } from "@/hooks/useProviderLogin";
import { envConfig } from "@/configs/envConfig";
import { UseCommonImports } from "@/utils/UseCommonImports";
import { CircularProgress } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";

const Google = () => {
  const providerLoginEndpoint = apiConfig.USER.PROVIDER_LOGIN;
  const [loading, setLoading] = useState(false);
  const { Router } = UseCommonImports();

  const { method } = Router.query;

  const handleGoogleLogin = () => {
    setLoading(true);
    signIn("google", {
      callbackUrl: `${envConfig.base_url}/auth/login?method=GOOGLE`,
      // callbackUrl: `https://thegranduchy.com/auth/login?method=GOOGLE`,
    });
  };

  const { data, status } = useSession();

  useHandleProviderLogin({
    status,
    authMethod: "GOOGLE",
    providerLoginEndpoint,
    data,
  });

  return (
    <button
      disabled={loading || method === "GOOGLE"}
      onClick={handleGoogleLogin}
      className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition-all disabled:cursor-not-allowed disabled:opacity-30"
    >
      <div className="w-10">
        <Image className="w-full h-full" src={googleLogo} alt="" />
      </div>
      {loading ? (
        <CircularProgress
          sx={{
            color: colorConfig.primary,
          }}
        />
      ) : method === "GOOGLE" ? (
        "Logging in..."
      ) : (
        "Sign in with Google"
      )}
    </button>
  );
};

export default Google;
