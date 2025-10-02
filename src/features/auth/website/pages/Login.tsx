import { Link } from "react-router-dom";
import MainInput from "../../../../common/components/inputs/MainInput";
import AuthCard from "../../../../common/layout/auth/AuthCard";
import { CiUser } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import { useTranslation } from "react-i18next";
import "../style/login-form.css";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import useLoginLogic from "../logic/useLoginLogic";
const Login = () => {
  const { t } = useTranslation();
  const { errors, register, onSubmit, handleSubmit, isPending } =
    useLoginLogic();
  return (
    <AuthCard
      title="login"
      description="By logging in, you can use the site's features."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8"
      >
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={CiUser}
            placeholder="user name"
            label="user name"
            enableAutocomplete
            storageKey="user-name"
            {...register("username")}
            error={errors.username?.message}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password"
            label="password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div className="mb-4 flex-between">
          <Link className="text-sm text-text-red" to="/auth/forget-password">
            {t("forget password?")}
          </Link>
          <label className="flex items-center gap-1 text-sm text-text-gray custom-checkbox">
            <input type="checkbox" {...register("rememberMe")} />
            {t("remember me")}
          </label>
        </div>
        <div className="w-full flex-center mb-7 sm:mb-8 md:mb-9 lg:mb-10">
          <div className="w-full md:w-[150px]">
            <MainBtn type="submit" text="login" isPending={isPending} />
          </div>
        </div>
        <div className="w-full flex-center text-sm gap-2">
          <span className="text-text-gray">{t("don't have an account ?")}</span>
          <Link to="/auth/register-with" className="text-darkBlue underline">
            {t("create an account")}
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;
