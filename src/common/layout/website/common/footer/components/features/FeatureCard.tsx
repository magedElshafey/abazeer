import { memo } from "react";
import type { Feature } from "./type/Feature";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  data: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <article className="flex items-center gap-3" aria-label={t(data.title)}>
      <img
        src={data.image}
        alt={t(data.title)}
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
        className="w-12 h-12 object-contain"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-md font-semibold">{t(data.title)}</h3>
        <p className="text-sm text-gray-500">{t(data.description)}</p>
      </div>
    </article>
  );
};

export default memo(FeatureCard);
