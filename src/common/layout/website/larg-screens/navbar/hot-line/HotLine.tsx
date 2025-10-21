import Loader from "@/common/components/loader/spinner/Loader";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import { useTranslation } from "react-i18next";
interface HotLineProps {
  hotline: string;
}

const HotLine: React.FC<HotLineProps> = () => {
  const { data, isLoading } = useGetWebsiteSettings();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <a
        href={`https://wa.me/${data?.hot_line}`}
        dir="ltr"
        className="text-md xl:text-xl font-extrabold"
      >
        {isLoading ? <Loader /> : data?.hot_line}
      </a>
      <p className="text-xs text-gray-400">{t("24/7 support")}</p>
    </div>
  );
};

export default HotLine;
