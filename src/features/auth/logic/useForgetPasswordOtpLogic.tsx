import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type OtpSchemaType, otpSchema } from "../schema/otpSchema";
import { useLocation, useNavigate } from "react-router-dom";
import useSendForgetPasswordOtp from "../api/useSendForgetPasswordOtp";
import toastErrorMessage from "@/utils/toastApiError";

interface LocationState {
  email: string;
}

const useForgetPasswordOtpLogic = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useSendForgetPasswordOtp();
  const location = useLocation();

  const { email } = (location.state || {} as LocationState);

  if(!email) navigate("/auth/login");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: OtpSchemaType) => {
    try {
      const response = await mutateAsync({
        ...data,
        email,
      });
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/reset-password", {state: {email}});
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

export default useForgetPasswordOtpLogic;
