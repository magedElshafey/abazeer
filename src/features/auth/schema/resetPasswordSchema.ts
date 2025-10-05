import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    error: "passwords_do_not_match",
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
