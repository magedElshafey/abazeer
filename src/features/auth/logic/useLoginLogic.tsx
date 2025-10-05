import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchemaType, loginSchema } from "../schema/loginSchema";
import useLogin from "../api/useLogin";
import { toast } from "sonner";
import { useAuth } from "@/store/AuthProvider";
import toastErrorMessage from "@/utils/toastApiError";


const useLoginLogic = () => {
  const { isPending, mutateAsync } = useLogin();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message);
        login(response.data);
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

export default useLoginLogic;
