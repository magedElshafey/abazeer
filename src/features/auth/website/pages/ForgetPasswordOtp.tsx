import AuthCard from "../../../../common/layout/auth/AuthCard";
import MainInput from "../../../../common/components/inputs/MainInput";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import useForgetPasswordOtpLogic from "../logic/useForgetPasswordOtpLogic";
const ForgetPasswordOtp = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useForgetPasswordOtpLogic();
  return (
    <AuthCard
      title="Password recovery"
      description="Enter the code sent to your email"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            type="text"
            required={true}
            placeholder="code"
            label="code"
            enableAutocomplete
            {...register("otp")}
            error={errors.otp?.message}
          />
        </div>
        <div className="w-full flex-center">
          <div className="w-full md:w-[180px]">
            <MainBtn type="submit" text="next" isPending={isPending} />
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgetPasswordOtp;
