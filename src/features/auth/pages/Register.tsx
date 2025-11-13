import useRegisterLogic from "../logic/useRegisterLogic";
import { useTranslation } from "react-i18next";
import AuthCard from "../../../common/layout/auth/AuthCard";
import MainInput from "../../../common/components/inputs/MainInput";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { CiUser } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import MainCheckInput from "../../../common/components/inputs/MainCheckInput";

const Register = () => {
  const { register, errors, handleSubmit, onSubmit, isPending, control } =
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
            {...register("name")}
            error={errors.name?.message}
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
        <div className="mb-4 grid-2 gap-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password"
            label="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password confirmation"
            label="password confirmation"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
        </div>
        <div>
          <MainCheckInput 
            label="agree-on-terms-and-conditions"
            control={control}
            name="agree_on_terms"
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
              className="w-full flex-center disabled:!pointer-events-auto"
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
