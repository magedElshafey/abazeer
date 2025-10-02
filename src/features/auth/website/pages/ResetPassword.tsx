import AuthCard from "../../../../common/layout/auth/AuthCard";
import MainInput from "../../../../common/components/inputs/MainInput";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import useResetPasswordLogic from "../logic/useResetPasswordLogic";
import { GoKey } from "react-icons/go";

const ResetPassword = () => {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useResetPasswordLogic();
  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password"
            label="password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="confirm new password"
            label="confirm new password"
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />
        </div>
        <div className="w-full flex-center">
          <div className="w-full md:w-[150px]">
            <MainBtn type="submit" text="login" isPending={isPending} />
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
