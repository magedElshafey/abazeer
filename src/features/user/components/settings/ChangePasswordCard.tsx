import { FC } from "react";
import { FiLock } from "react-icons/fi";
import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import { type ChangePasswordSchemaType } from "@/features/auth/schema/passwordSchema";
import { useChangeUserPasswordLogic } from "../../logic/useChangeUserPasswordLogic";
import SettingsCard from "./SettingsCard";

const ChangePasswordCard: FC = () => {
  const { onSubmit, isPending, register, handleSubmit, errors, reset } = useChangeUserPasswordLogic();

  const handleFormSubmit = async (data: ChangePasswordSchemaType) => {
    await onSubmit(data);
    reset();
  };

  return (
    <SettingsCard
      title="change-password"
      description="change-password-description"
      icon={FiLock}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <MainInput
          {...register("current_password")}
          label="current-password"
          placeholder="current-password"
          type="password"
          required
          error={errors.current_password?.message}
        />

        <MainInput
          {...register("new_password")}
          label="new-password"
          placeholder="new-password"
          type="password"
          required
          error={errors.new_password?.message}
        />

        <MainInput
          {...register("new_password_confirmation")}
          label="password-confirmation"
          placeholder="confirm-password"
          type="password"
          required
          error={errors.new_password_confirmation?.message}
        />

        <div className="pt-4">
          <MainBtn
            type="submit"
            isPending={isPending}
            text="change-password"
          />
        </div>
      </form>
    </SettingsCard>
  );
};

export default ChangePasswordCard;
