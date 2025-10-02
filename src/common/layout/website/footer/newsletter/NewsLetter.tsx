import { useTranslation } from "react-i18next";
import { useState } from "react";
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const NewsLetter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(!value || validateEmail(value));
  };
  return (
    <section aria-labelledby="newsletter-heading">
      <h3
        id="newsletter-heading"
        className="font-semibold mb-4 text-md lg:text-lg xl:text-xl"
      >
        {t("Newsletter")}
      </h3>
      <p className="mb-4 text-xs text-gray-500 leading-relaxed">
        {t("Subscribe to our newsletter for latest offers and updates.")}
      </p>

      <form
        className="flex items-center w-full"
        aria-label="Newsletter subscription"
      >
        <div className="relative flex-1 h-12">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("email")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder={t("email", { defaultValue: "Enter your email" })}
            className={`border w-full h-full bg-white text-darkColor px-2 focus:outline-none rounded-md ${
              isValid ? "" : "border-red-500"
            }`}
            aria-invalid={!isValid}
            aria-describedby={!isValid ? "email-error" : undefined}
          />
          {!isValid && (
            <span
              id="email-error"
              role="alert"
              className="text-xs text-red-600"
            >
              {t("Please enter a valid email")}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="h-12 px-3 bg-orangeColor hover:bg-opacity-90 font-medium border-2 border-orangeColor focus:outline-none focus:ring-2 focus:ring-orangeColor disabled:cursor-not-allowed disabled:bg-orangeColor/15 transition-all duration-200 text-sm rounded-md"
        >
          {t("subscribe", { defaultValue: "Subscribe" })}
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
