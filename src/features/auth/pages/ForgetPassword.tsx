import AuthCard from "../../../common/layout/auth/AuthCard";
import MainInput from "../../../common/components/inputs/MainInput";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../store/LanguageProvider";
import useForgetPasswordLogic from "../logic/useForgetPasswordLogic";
const ForgetPassword = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useForgetPasswordLogic();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === "ar";
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
          <div className="w-full md:w-[180px] flex gap-2">
            {isRTL ? (
              <>
                <MainBtn type="submit" className="flex-1 flex-center" text="next" isPending={isPending} />
                <MainBtn
                  type="button"
                  onClick={() => navigate("/auth/login")}
                  className="flex-1 flex-center"
                  text="back"
                  theme="outline"
                >
                  <IoArrowBack size={18} />
                </MainBtn>
              </>
            ) : (
              <>
                <MainBtn
                  type="button"
                  onClick={() => navigate("/auth/login")}
                  className="flex-1 flex-center"
                  text="back"
                  theme="outline"
                >
                  <IoArrowBack size={18} />
                </MainBtn>
                <MainBtn type="submit" className="flex-1 flex-center" text="next" isPending={isPending} />
              </>
            )}
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgetPassword;
