import { useTranslation } from "react-i18next";

const SaudiCurrency = () => {
  const { i18n } = useTranslation();
  return (
    <>
      {i18n.language === "ar" ? (
        <img
          className="w-3 h-3 object-contain"
          alt="saudi-currency"
          src="/images/r.png"
        />
      ) : (
        <p>SAR</p>
      )}
    </>
  );
};

export default SaudiCurrency;
