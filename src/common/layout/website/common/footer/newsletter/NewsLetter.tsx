import { useTranslation } from "react-i18next";
import useNewsLetterLogic from "./logic/useNewsLetterLogic";
import Loader from "@/common/components/loader/spinner/Loader";
interface NewsLetterProps {
  onClose?: () => void;
}
const NewsLetter: React.FC<NewsLetterProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const {
    states: { isValid, isTouched, email, isPending },
    handlers: { handleBlur, handleInputChange, handleSubmit },
  } = useNewsLetterLogic(onClose);

  const showError = !isValid && isTouched;

  return (
    <section aria-labelledby="newsletter-heading" className="w-full">
      <h3
        id="newsletter-heading"
        className="font-semibold mb-4 text-md lg:text-lg xl:text-xl"
      >
        {t("Newsletter")}
      </h3>

      <p className="mb-4 text-xs text-gray-500 leading-relaxed">
        {t("subscribe to our newsletter for latest offers and updates")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-start  gap-2 w-full"
        aria-label={t("Newsletter subscription")}
        noValidate
      >
        <div className="relative flex-1 w-full">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("email")}
          </label>

          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={t("email", { defaultValue: "Enter your email" })}
            className={`border w-full h-12 bg-white text-darkColor px-3 focus:outline-none rounded-md transition-colors duration-200 ${
              showError
                ? "border-red-500"
                : "border-gray-300 focus:border-orangeColor"
            }`}
            aria-invalid={showError}
            aria-describedby={showError ? "email-error" : undefined}
            autoComplete="email"
          />

          {showError && (
            <span
              id="email-error"
              role="alert"
              className="text-xs text-red-600 mt-1 block"
            >
              {t("Please enter a valid email")}
            </span>
          )}
        </div>

        <button
          type="submit"
          aria-busy={isPending}
          disabled={isPending || !email.trim() || !isValid}
          className="h-12 px-4 bg-orangeColor hover:bg-opacity-90 text-white font-medium border-2 border-orangeColor focus:outline-none focus:ring-2 focus:ring-orangeColor/50 disabled:cursor-not-allowed disabled:bg-orangeColor/80 transition-all duration-200 text-sm rounded-md w-auto"
        >
          {isPending ? (
            <Loader />
          ) : (
            t("subscribe", { defaultValue: "Subscribe" })
          )}
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
