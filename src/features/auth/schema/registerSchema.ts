import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { loginSchema } from "./loginSchema";
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, "user name is required"),
    email: emailSchema,
    phone: z
      .string()
      .regex(
        /^01[0|1|2|5][0-9]{8}$/,
        "Phone must be 11 digits and start with 010, 011, 012, or 015"
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    error: "passwords_do_not_match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
