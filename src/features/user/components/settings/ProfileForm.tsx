import { FC } from "react";
import { FiUser } from "react-icons/fi";
import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import { type ProfileSchemaType } from "@/features/auth/schema/profileSchema";
import { useProfileLogic } from "../../logic/useProfileLogic";
import SettingsCard from "./SettingsCard";

const ProfileForm: FC = () => {
  const { onSubmit, isPending, register, handleSubmit, errors } =
    useProfileLogic();

  const handleFormSubmit = async (data: ProfileSchemaType) => {
    await onSubmit(data);
  };

  return (
    <SettingsCard
      title="profile information"
      description="update profile description"
      icon={FiUser}
      iconBgColor="bg-orange-100"
      iconColor="text-orange-600"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <MainInput
          {...register("name")}
          label="full name"
          placeholder="full name"
          type="text"
          required
          error={errors.name?.message}
        />
        <MainInput
          {...register("phone")}
          label="phone"
          placeholder="phone"
          type="tel"
          required
          error={errors.phone?.message}
          disabled
        />
        <MainInput
          {...register("email")}
          label="email"
          placeholder="email"
          type="email"
        />

        <div className="pt-4">
          <MainBtn type="submit" isPending={isPending} text="update" />
        </div>
      </form>
    </SettingsCard>
  );
};

export default ProfileForm;
