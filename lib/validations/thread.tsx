import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3).max(1000),
});
