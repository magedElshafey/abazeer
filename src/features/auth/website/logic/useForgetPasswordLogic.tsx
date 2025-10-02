import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  type ForgetPasswordSchemaType,
  forgetPasswordSchema,
} from "../schema/forgetPasswordSchema";
import handlePromisError from "../../../../utils/handlePromiseError";
import useForgetPassword from "../api/useForgetPassword";
import { useNavigate } from "react-router-dom";
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
    const formData = new FormData();
    formData?.append("email", data?.email);

    try {
      const response = await mutateAsync(formData);
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/forget-password-otp");
      }
    } catch (error) {
      handlePromisError(error);
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
