import useRegisterLogic from "../logic/useRegisterLogic";
import { useTranslation } from "react-i18next";
import AuthCard from "../../../../common/layout/auth/AuthCard";
import MainInput from "../../../../common/components/inputs/MainInput";
import MainSelect from "../../../../common/components/inputs/MainSelect";
import MainDate from "../../../../common/components/inputs/MainDateInput";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import { CiUser } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
  MdLocationCity,
  MdEmojiFlags,
  MdOutlineVerifiedUser,
} from "react-icons/md";
const cities = [
  {
    id: 1,
    name: "المنصورة",
  },
  {
    id: 2,
    name: "القاهرة",
  },
  {
    id: 3,
    name: "الإسكندرية",
  },
  {
    id: 4,
    name: "السويس",
  },
];
const accountTypes = [
  {
    id: 1,
    name: "طالب",
  },
  {
    id: 2,
    name: "معلم",
  },
  {
    id: 3,
    name: "ادمن",
  },
  {
    id: 4,
    name: "خدمة عملاء",
  },
];
const Register = () => {
  const { register, errors, control, handleSubmit, onSubmit, isPending } =
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
            required={true}
            Icon={MdOutlinePhoneEnabled}
            placeholder="phone"
            label="phone"
            enableAutocomplete
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div className="mb-4 grid-2 gap-4">
          <Controller
            control={control}
            name="country"
            rules={{ required: "country is required" }}
            render={({ field }) => (
              <MainSelect
                options={cities}
                value={field.value ?? null}
                onChange={(val) => field.onChange(val)}
                onBlur={field.onBlur}
                placeholder="country"
                label="country"
                required
                Icon={MdEmojiFlags}
                error={errors.country?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            rules={{ required: "city is required" }}
            render={({ field }) => (
              <MainSelect
                options={cities}
                value={field.value ?? null}
                onChange={(val) => field.onChange(val)}
                onBlur={field.onBlur}
                placeholder="city"
                label="city"
                required
                Icon={MdLocationCity}
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="accountType"
            rules={{ required: "account Type is required" }}
            render={({ field }) => (
              <MainSelect
                options={accountTypes}
                value={field.value ?? null}
                onChange={(val) => field.onChange(val)}
                onBlur={field.onBlur}
                placeholder="accountType"
                label="accountType"
                required
                Icon={MdOutlineVerifiedUser}
                error={errors.accountType?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="birthDate"
            rules={{ required: "birthDate is required" }}
            render={({ field }) => (
              <MainDate
                label="birth date"
                placeholder="select your birth date"
                required
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.birthDate?.message}
              />
            )}
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
        <div className="w-full mb-7 text-sm gap-2">
          <span className="text-text-gray">{t("have an account ?")}</span>
          <Link to="/auth/login" className="text-darkBlue underline">
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
