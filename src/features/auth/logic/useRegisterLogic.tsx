import useRegister from "../api/useRegister";
import { useAuth } from "../../../store/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RegisterSchemaType,
  registerSchema,
} from "../schema/registerSchema";
import { toast } from "sonner";
import toastErrorMessage from "../../../utils/toastApiError";
import { useNavigate } from "react-router-dom";

const useRegisterLogic = () => {
  const { isPending, mutateAsync } = useRegister();
  const navigate = useNavigate();

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      email: "",
      password_confirmation: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        navigate("../login");
        toast.success(response?.message);
        login(response?.data);
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
  };
};

export default useRegisterLogic;
