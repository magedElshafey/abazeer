import { FC } from "react";
import { useTranslation } from "react-i18next";

interface HeroProps {
  title: string;
  className?: string;
}

const Hero: FC<HeroProps> = ({ title, className = "" }) => {
  const { t } = useTranslation();

  return (
    <div className={`h-32 flex items-center justify-center ${className}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        {t(title)}
      </h1>
    </div>
  );
};

export default Hero;
