import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ResetPasswordSchemaType,
  resetPasswordSchema,
} from "../schema/resetPasswordSchema";
import handlePromisError from "../../../../utils/handlePromiseError";
import useResetPassword from "../api/useResetPassword";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const useResetPasswordLogic = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (data: ResetPasswordSchemaType) => {
    const formData = new FormData();
    formData.append("confirm_password", data?.confirmNewPassword);
    formData?.append("password", data?.newPassword);
    try {
      const response = await mutateAsync(formData);
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/reset-password-success");
      }
    } catch (error) {
      handlePromisError(error);
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
