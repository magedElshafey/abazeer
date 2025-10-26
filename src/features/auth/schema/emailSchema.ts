import { z } from "zod";

export const emailSchema = z.email("invalid email address");

export type EmailSchemaType = z.infer<typeof emailSchema>;