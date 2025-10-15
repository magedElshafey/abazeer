import { FC } from "react";
import { useTranslation } from "react-i18next";
import useGetFeatures from "@/common/layout/website/common/footer/api/useGetFeatures";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import FeatureCard from "@/common/layout/website/common/footer/components/features/FeatureCard";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
const ProductFeatures: FC = () => {
  const { t } = useTranslation();
  const queryResult = useGetFeatures();
  const { data } = queryResult;
  const { data: settings } = useGetWebsiteSettings();

  return (
    <>
      <FetchHandler queryResult={queryResult} skeletonType="feature">
        {data?.length ? (
          <div className="bg-background-gray rounded-md flex flex-col px-4 gap-4">
            {data?.map((item) => (
              <FeatureCard key={item?.id} data={item} />
            ))}
          </div>
        ) : null}
      </FetchHandler>
      {settings?.hot_line && (
        <div className="bg-background-gray rounded-md flex flex-col items-center gap-2 p-4">
          <p className="text-lg">{t("Hotline Order")}:</p>
          <p className="text-sm">{t("Hotline Hours")}</p>
          <a
            dir="ltr"
            target="_blank"
            rel="noreferrer noopener"
            className="text-xl font-bold block text-end"
            href={`tel:${settings?.hot_line}`}
          >
            {settings?.hot_line}
          </a>
        </div>
      )}
    </>
  );
};

export default ProductFeatures;
