import { z } from "zod";

export const RegisterFormInput = z
  .object({
    fullName: z.string().min(20).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    profilePicture: z.string().url(),
    address: z.string().min(20).max(255),
    phone: z.string().min(11).max(11),
    cpf: z.string().min(11).max(11),
    creditCardNumber: z.string().min(16).max(16),
    creditCardName: z.string().min(20).max(255),
    creditCardCVC: z.string().min(3).max(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha e confirmação devem ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterFormInput = z.infer<typeof RegisterFormInput>;
