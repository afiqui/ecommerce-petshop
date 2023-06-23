import { useForm } from "react-hook-form";
import { UserFormInput } from "../validation/user-form";

export const useUserForm = () => {
  return useForm<UserFormInput>({
    defaultValues: {

    },
  });
};
