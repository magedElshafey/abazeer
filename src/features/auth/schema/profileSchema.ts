import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "full name is required")
    .min(2, "full name must be at least 2 characters"),

  email: z
    .email("invalid email address"),
  
  phone: z
    .string()
    .min(1, "phone is required")
    .regex(/^01[0-5]\d{8}$/, "Phone must be 11 digits and start with 010, 011, 012, or 015"),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
