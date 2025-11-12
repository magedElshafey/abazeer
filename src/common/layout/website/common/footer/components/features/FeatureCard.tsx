import { memo } from "react";
import type { Feature } from "@/features/settings/types/settings.type";
import { useTranslation } from "react-i18next";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface FeatureCardProps {
  data: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <article className="flex  gap-3" aria-label={t(data.name)}>
      <img
        src={data.image}
        alt={t(data.name)}
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
        className="w-12 h-12 object-contain"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-md font-semibold">{t(data.name)}</h3>
        <HtmlConverter html={data.description} />
      </div>
    </article>
  );
};

export default memo(FeatureCard);
