import { z } from "zod";
import { passwordSchema } from "./passwordSchema";
import { emailSchema } from "./emailSchema";
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
