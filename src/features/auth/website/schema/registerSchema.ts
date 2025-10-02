import { z } from "zod";
import { loginSchema } from "./loginSchema";
import { emailSchema } from "./emailSchema";
export const registerSchema = loginSchema.extend({
  email: emailSchema,
  phone: z
    .string()
    .regex(
      /^01[0|1|2|5][0-9]{8}$/,
      "Phone must be 11 digits and start with 010, 011, 012, or 015"
    ),
  city: z.number().refine((val) => val !== undefined && val !== null, {
    message: "city is required",
  }),
  country: z.number().refine((val) => val !== undefined && val !== null, {
    message: "country is required",
  }),
  accountType: z.number().refine((val) => val !== undefined && val !== null, {
    message: "accountType is required",
  }),
  birthDate: z.string().min(1, "birthDate is required"),

  //   confirmPassword: z.string().min(6, "password must be at least 6 characters"),
});

// 👇 نتحقق إن confirmPassword = password
// export const finalRegisterSchema = registerSchema.refine(
//   (data) => data.password === data.confirmPassword,
//   {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   }
// );

export type RegisterSchemaType = z.infer<typeof registerSchema>;
