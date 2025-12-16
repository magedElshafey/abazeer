import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "full name is required")
    .min(2, "full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.string().email().optional()),

  phone: z
    .string()
    .min(1, "phone is required")
    .regex(/^05\d{8}$/, "Phone must start with 05 followed by 8 digits"),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
