import { useForm } from "react-hook-form";
import { RegisterFormInput } from "../validation/register-form";

export const useRegisterForm = () => {
  return useForm<RegisterFormInput>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });
};
