import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchemaType, loginSchema } from "../schema/loginSchema";
import useLogin from "../api/useLogin";
import handlePromisError from "../../../../utils/handlePromiseError";
import { toast } from "sonner";
const useLoginLogic = () => {
  const { isPending, mutateAsync } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit = async (data: LoginSchemaType) => {
    const formData = new FormData();
    formData.append("user_name", data?.username);
    formData?.append("password", data?.password);
    try {
      const response = await mutateAsync(formData);
      if (response?.status) {
        toast.success(response?.message);
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

export default useLoginLogic;
