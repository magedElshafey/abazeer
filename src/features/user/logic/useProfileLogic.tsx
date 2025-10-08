import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import { useAuth } from "@/store/AuthProvider";
import { profileSchema, type ProfileSchemaType } from "@/features/auth/schema/profileSchema";
import useUpdateProfile from "../api/settings/useUpdateProfile";

const useProfileLogic = () => {
    const { user } = useAuth();
    const { isPending, mutateAsync } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        },
    });

    const onSubmit = async (data: ProfileSchemaType) => {
        try {
              const response = await mutateAsync(data);
              if (response?.status) {
                toast.success(response?.message || "Profile updated successfully");
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
        reset,
    };
};

export { useProfileLogic };
