import { z } from "zod";
import { singlePasswordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "phone is required")
    .regex(/^05\d{8}$/, "Phone must start with 05 followed by 8 digits"),
  password: singlePasswordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
