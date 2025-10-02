import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../api/useRegister";
import {
  type RegisterSchemaType,
  registerSchema,
} from "../schema/registerSchema";
import { toast } from "sonner";
import handlePromisError from "../../../../utils/handlePromiseError";
const useRegisterLogic = () => {
  const { isPending, mutateAsync } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    const formData = new FormData();
    formData.append("name", data?.username);
    formData?.append("password", data?.password);
    formData?.append("phone", data?.phone);
    formData?.append("email", data?.email);
    formData?.append("city_id", String(data.city));
    formData?.append("country_id", String(data.country));
    formData?.append("account_type_id", String(data.accountType));
    formData?.append("birth_date", String(data.birthDate));
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
    control,
    isPending,
    onSubmit,
  };
};

export default useRegisterLogic;
