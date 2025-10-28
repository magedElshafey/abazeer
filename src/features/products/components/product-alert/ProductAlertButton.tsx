import DialogComponent from "@/common/components/dialog/dialog";
import MainInput from "@/common/components/inputs/MainInput";
import { emailSchema } from "@/features/auth/schema/emailSchema";
import { useAuth } from "@/store/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react"
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosNotificationsOutline } from "react-icons/io";
import z from "zod";
import useAlertUser from "../../api/useAlertUser";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";

const reviewSchema = z.object({
    email: emailSchema
})

const ProductAlertButton = ({ children, productId }: { children: ({ onClick, isPending }: { onClick?: () => void, isPending?: boolean }) => ReactElement, productId: number }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const {
        mutateAsync,
        mutate,
        isPending
    } = useAlertUser(productId);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
        reset,
        clearErrors,
    } = useForm({
        resolver: zodResolver(reviewSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: {
            email: ""
        }
    })

    function handleReset() {
        reset();
        clearErrors();
    }

    const submitForm = handleSubmit(async (data) => {
        const response = await mutateAsync(data.email, {
            onSuccess: (response) => {
                toast.success(response.data.message);
                handleReset();
            } 
        });
        return response;
    })

    if (user) {
        return (
            children({ onClick: () => mutate(undefined, {
                onSuccess: (response) => {
                    toast.success(response.data.message);
                },
                onError: (err) => toastErrorMessage(err),
            }) , isPending })
        )
    }


    return (
        <DialogComponent
            content={(
                <div className="p-2 flex-center flex-col gap-2 text-text-gray">
                    <div className="flex-center h-20 w-20 rounded-full border text-text-gray">
                        <IoIosNotificationsOutline size={40} />
                    </div>
                    <p className="text-xl text-black font-bold">
                        {t("alert-me-when-product-available")}
                    </p>
                    <p>
                        {t("enter-your-data-and-become-first-to-know")}
                    </p>
                    <MainInput 
                        label="email"
                        type="email"
                        error={errors.email?.message}
                        {...register("email")}
                    />
                </div>
            )}
            action={{
                text: "alert-me",
                action: submitForm,
                disabled: !isValid 
            }}
            cancel={{
                action: handleReset
            }}
        >
            {children({})}
        </DialogComponent>
    );
}

export default ProductAlertButton;