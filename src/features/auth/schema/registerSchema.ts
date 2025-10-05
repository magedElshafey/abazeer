import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { passwordWithConfirmSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: emailSchema,
    phone: z
      .string()
      .regex(
        /^01[0|1|2|5][0-9]{8}$/,
        "Phone must be 11 digits and start with 010, 011, 012, or 015"
      ),
  })
  .merge(passwordWithConfirmSchema);

export type RegisterSchemaType = z.infer<typeof registerSchema>;
