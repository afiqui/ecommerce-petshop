import { z } from "zod";

export const UserFormInput = z.object({
  fullName: z.string().min(20).max(255).optional(),
  isAdmin: z.boolean().optional(),
});

export type UserFormInput = z.infer<typeof UserFormInput>;