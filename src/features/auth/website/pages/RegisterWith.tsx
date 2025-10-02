import AuthCard from "../../../../common/layout/auth/AuthCard";
import RegisterButton from "../components/register-with/RegisterButton";
import RegisterByFacebook from "../components/register-with/RegisterByFacebook";
import RgisterByGoogle from "../components/register-with/RgisterByGoogle";

const RegisterWith = () => {
  return (
    <AuthCard
      title="Create a new account"
      description="By logging in, you can use the site's features."
    >
      <div className="flex-column gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mt-5 sm:mt-6 md:mt-7 lg:mt-8">
        <RegisterButton />
        <RgisterByGoogle />
        <RegisterByFacebook />
      </div>
    </AuthCard>
  );
};

export default RegisterWith;
