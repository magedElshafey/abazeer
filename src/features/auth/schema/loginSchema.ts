import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { singlePasswordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: singlePasswordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
