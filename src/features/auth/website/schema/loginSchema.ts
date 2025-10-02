import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  username: z.string().min(1, "user name is required"),
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
