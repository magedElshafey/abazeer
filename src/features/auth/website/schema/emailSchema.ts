import { z } from "zod";

export const emailSchema = z.string().email("invalid email address");
