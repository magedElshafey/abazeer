import AuthCard from "../../../../common/layout/auth/AuthCard";
import MainInput from "../../../../common/components/inputs/MainInput";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import { MdOutlineEmail } from "react-icons/md";
import useForgetPasswordLogic from "../logic/useForgetPasswordLogic";
const ForgetPassword = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useForgetPasswordLogic();
  return (
    <AuthCard
      title="Password recovery"
      description="Enter your email to recover your password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            type="email"
            required={true}
            Icon={MdOutlineEmail}
            placeholder="email"
            label="email"
            enableAutocomplete
            {...register("email")}
            error={errors.email?.message}
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

export default ForgetPassword;
