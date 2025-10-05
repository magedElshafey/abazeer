import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  type ForgetPasswordSchemaType,
  forgetPasswordSchema,
} from "../schema/forgetPasswordSchema";
import useForgetPassword from "../api/useForgetPassword";
import { useNavigate } from "react-router-dom";
import toastErrorMessage from "@/utils/toastApiError";

const useForgetPasswordLogic = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useForgetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: ForgetPasswordSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/forget-password-otp");
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
  };
};

export default useForgetPasswordLogic;
