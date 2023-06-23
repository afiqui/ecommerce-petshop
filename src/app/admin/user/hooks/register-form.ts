import { useForm } from "react-hook-form";
import { SigninFormInput } from "../validation/register-form";

export const useRegisterForm = () => {
  return useForm<SigninFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
