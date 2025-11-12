import { z } from "zod";
import { emailSchema } from "@/features/auth/schema/emailSchema";
export const contactusSchema = z.object({
  name: z.string().min(1, "user name is required"),
  address: z.string().min(1, "address is required"),
  subject: z.string().min(1, "subject is required"),
  message: z.string().min(1, "message is required"),
  email: emailSchema,
  phone: z
    .string()
    .min(1, "phone is required")
    .regex(/^05\d{8}$/, "Phone must start with 05 followed by 8 digits"),
});

export type ContactusSchemaType = z.infer<typeof contactusSchema>;
