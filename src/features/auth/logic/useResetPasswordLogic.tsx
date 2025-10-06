import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useResetPassword from "../api/useResetPassword";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { passwordWithConfirmSchema, PasswordWithConfirmSchemaType } from "../schema/passwordSchema";
import toastErrorMessage from "@/utils/toastApiError";

interface LocationState {
  email: string;
}

const useResetPasswordLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = (location.state as LocationState || {} );

  if(!email) navigate("../login");

  const { isPending, mutateAsync } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordWithConfirmSchemaType>({
    resolver: zodResolver(passwordWithConfirmSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: PasswordWithConfirmSchemaType) => {
    try {
      const response = await mutateAsync({
        ...data,
        email,
      });
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/reset-password-success");
      }
    } catch (error) {
      toastErrorMessage(error as Error);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
  };
};

export default useResetPasswordLogic;
