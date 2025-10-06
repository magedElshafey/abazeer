import { z } from "zod";
import { passwordWithConfirmSchema } from "./passwordSchema";
import { emailSchema } from "./emailSchema";

export const resetPasswordSchema = passwordWithConfirmSchema
  .extend({
    email: emailSchema,
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;