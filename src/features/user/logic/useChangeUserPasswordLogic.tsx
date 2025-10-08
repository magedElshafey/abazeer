import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import useChangePassword from "../api/useChangePassword";
import { changePasswordSchema, type ChangePasswordSchemaType } from "@/features/auth/schema/passwordSchema";

const useChangeUserPasswordLogic = () => {
  const { isPending, mutateAsync } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message || "Password changed successfully");
        reset();
      }
    } catch (error) {
      toastErrorMessage(error as Error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    isPending,
    onSubmit,
    reset,
  };
};

export { useChangeUserPasswordLogic };

