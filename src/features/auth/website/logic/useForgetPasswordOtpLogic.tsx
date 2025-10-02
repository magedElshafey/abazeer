import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type OtpSchemaType, otpSchema } from "../schema/otpSchema";
import handlePromisError from "../../../../utils/handlePromiseError";
import { useNavigate } from "react-router-dom";
import useSendForgetPasswordOtp from "../api/useSendForgetPasswordOtp";
const useForgetPasswordOtpLogic = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useSendForgetPasswordOtp();
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
      otp: "",
    },
  });
  const onSubmit = async (data: OtpSchemaType) => {
    const formData = new FormData();
    formData?.append("code", data?.otp);

    try {
      const response = await mutateAsync(formData);
      if (response?.status) {
        toast.success(response?.message);
        navigate("/auth/reset-password");
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

export default useForgetPasswordOtpLogic;
