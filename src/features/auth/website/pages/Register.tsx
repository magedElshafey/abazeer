import useRegisterLogic from "../logic/useRegisterLogic";
import { useTranslation } from "react-i18next";
import AuthCard from "../../../../common/layout/auth/AuthCard";
import MainInput from "../../../../common/components/inputs/MainInput";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import { CiUser } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";

const Register = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useRegisterLogic();
  const { t } = useTranslation();
  return (
    <AuthCard
      title="Create a new account"
      description="By logging in, you can use the site's features."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={CiUser}
            placeholder="user name"
            label="user name"
            enableAutocomplete
            {...register("username")}
            error={errors.username?.message}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={MdOutlineEmail}
            placeholder="email"
            label="email"
            enableAutocomplete
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={false}
            Icon={MdOutlinePhoneEnabled}
            placeholder="phone"
            label="phone"
            enableAutocomplete
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div className="mb-4 grid-2 gap-4"></div>
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
        <div className="w-full mb-7 text-sm gap-2">
          <span className="text-text-gray">{t("have an account ?")}</span>
          <Link to="/auth/login" className="text-orangeColor underline">
            {t("login now")}
          </Link>
        </div>
        <div className="w-full flex-center">
          <div className="w-full md:w-[180px]">
            <MainBtn
              type="submit"
              text="Create a new account"
              isPending={isPending}
            />
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default Register;
