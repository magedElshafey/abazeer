import { z } from "zod";
import { loginSchema } from "./loginSchema";
import { emailSchema } from "./emailSchema";
export const registerSchema = loginSchema.extend({
  username: z.string().min(1, "user name is required"),
  email: emailSchema,
  phone: z
    .string()
    .regex(
      /^01[0|1|2|5][0-9]{8}$/,
      "Phone must be 11 digits and start with 010, 011, 012, or 015"
    ),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
