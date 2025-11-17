"use strict";
// import { z } from "zod";
// import { LinkedProvidersEnums } from "./user.constant";
// const checkUserForProviderLoginValidation = z.object({
//   body: z.object({
//     authMethod: z.enum([...LinkedProvidersEnums] as [string, ...string[]], {
//       required_error: "Unknown Auth Method",
//     }),
//     email: z.string({
//       required_error: "Email is Required",
//     }),
//   }),
// });
// const providerLoginZodSchema = z.object({
//   body: z.object({
//     userInfo: z.object({
//       userName: z.string({
//         required_error: "User Name is Required",
//       }),
//       email: z.string({
//         required_error: "Email is Required",
//       }),
//       bio: z.string().optional(),
//     }),
//     authMethod: z.enum([...LinkedProvidersEnums] as [string, ...string[]], {
//       required_error: "Unknown Auth Method",
//     }),
//   }),
// });
// export const UserValidation = {
//   checkUserForProviderLoginValidation,
//   providerLoginZodSchema,
// };
