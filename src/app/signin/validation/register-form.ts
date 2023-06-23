import { z } from "zod";

export const SigninFormInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type SigninFormInput = z.infer<typeof SigninFormInput>;
