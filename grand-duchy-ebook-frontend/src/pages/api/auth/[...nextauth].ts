import { envConfig } from "@/configs/envConfig";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: envConfig.google_id,
      clientSecret: envConfig.google_secret,
    }),
  ],
};

export default NextAuth(authOptions);
