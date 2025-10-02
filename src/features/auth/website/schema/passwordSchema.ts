import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "password must be at least 6 characters");
