import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type AddressSchemaType,
  addressSchema,
} from "../schemas/addresses";
import useCreateAddress from "../api/addresses/useCreateAddress";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import { useNavigate } from "react-router-dom";

const useCreateAddressLogic = () => {
  const { isPending, mutateAsync } = useCreateAddress();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      type_id: 0,
      postcode: "",
      address: "",
      address2: "",
      city_id: 0,
      country_id: 0,
    },
  });

  const onSubmit = async (data: AddressSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response?.message);
        reset();
        navigate("..");
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
    watch,
    setValue,
    reset,
  };
};

export default useCreateAddressLogic;