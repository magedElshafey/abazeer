import useContactUs from "@/features/static-pages/api/contact/useContactUs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  contactusSchema,
  ContactusSchemaType,
} from "../schema/contactusSchema";
import handlePromisError from "@/utils/handlePromiseError";
const useContactusLogic = () => {
  const { isPending, mutateAsync } = useContactUs();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactusSchemaType>({
    resolver: zodResolver(contactusSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      subject: "",
      message: "",
      address: "",
    },
  });
  const onSubmit = async (data: ContactusSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message);
        reset();
      }
    } catch (error) {
      handlePromisError(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
};

export default useContactusLogic;
