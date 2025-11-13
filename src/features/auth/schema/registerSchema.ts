import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { loginSchema } from "./loginSchema";
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, "user name is required"),
    email: emailSchema,
    phone: z
      .string()
      .min(1, "phone is required")
      .regex(/^05\d{8}$/, "Phone must start with 05 followed by 8 digits"),
    password_confirmation: z.string(),
    agree_on_terms: z
      .boolean()
      .refine((val) => val === true, { message: "must-agree-on-terms" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    error: "passwords_do_not_match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
