import { z } from "zod";

export const schema = z.object({
  email: z
    .string({ required_error: "Please enter your register email" })
    .min(1, { message: "Please enter your register email" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Please enter your password" })
    .min(1, { message: "Please enter your password" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});
