import { useTranslation } from "react-i18next";
interface HotLineProps {
  hotline: string;
}
function formatNumber(input: number | string): string {
  const digits = String(input).replace(/\D/g, "");

  if (digits.length < 4) return digits;

  const firstPart = digits.slice(0, 2);
  const secondPart = digits.slice(2, 4);

  const rest = digits.slice(4);

  const restFormatted = rest.replace(/(\d{3})(?=\d)/g, "$1 ");

  return `${firstPart}-${secondPart} ${restFormatted}`.trim();
}

const HotLine: React.FC<HotLineProps> = ({ hotline }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <p dir="ltr" className="text-md xl:text-2xl font-extrabold">
        {formatNumber(hotline)}
      </p>
      <p className="text-xs text-gray-400">{t("24/7 support")}</p>
    </div>
  );
};

export default HotLine;
