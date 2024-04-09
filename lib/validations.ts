import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  fullname: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  email: z.string().email(),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});
export const TaskValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(50, { message: "Maximum 30 caracters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  duration: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      { required_error: "Date is required." }
    )
    .refine((date) => {
      return !!date.from;
    }, "Date is required."),
  taskGroup: z.string().optional(),
  progress: z.array(z.number()),
  executor: z.string(),
  supporter: z.string().optional(),
});
