import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchemaType, loginSchema } from "../schema/loginSchema";
import useLogin from "../api/useLogin";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";

const useLoginLogic = () => {
  const { isPending, mutateAsync } = useLogin();
  const { login, lastPublicPage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || lastPublicPage.current || "/my-profile";
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message);
        login(response.data, data.rememberMe);
        navigate(from, { replace: true });
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
    control,
  };
};

export default useLoginLogic;
