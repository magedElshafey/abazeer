import { z } from "zod";
import { emailSchema } from "./emailSchema";

export const forgetPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
