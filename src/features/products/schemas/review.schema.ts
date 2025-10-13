import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .int("rating must be a whole number")
    .min(1, "rating must be at least 1")
    .max(5, "rating must be at most 5"),
  comment: z
    .string()
    .min(1, "comment is required")
    .trim()
    .refine((val) => val.length > 0, "Comment cannot be empty"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
