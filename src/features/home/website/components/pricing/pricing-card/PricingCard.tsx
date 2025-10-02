import type { Pricing } from "../../../types/Pricing";
import MainBtn from "../../../../../../common/components/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
interface PricingCardProps {
  plan: Pricing;
  index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
  const navigate = useNavigate();
  const handleNavigateClick = useCallback(() => {
    navigate(`/plan/${plan?.id}`);
  }, [navigate, plan]);

  return (
    <div
      className={`relative rounded-2xl p-6 shadow-lg transition-all duration-300
                ${
                  plan?.highlight
                    ? "bg-darkBlue text-white shadow-2xl z-10"
                    : "bg-white"
                }
              `}
      style={{
        transform: `translateY(${index * 40}px)`,
      }}
    >
      <p
        className={`mb-4 sm:mb-5 md:mb-6  ${
          plan?.highlight ? "text-white" : "text-darkBlue"
        }`}
      >
        {plan.title}
      </p>

      <p className="text-4xl font-bold mb-1">{plan.price}</p>
      <p
        className={`text-sm mb-4 ${
          plan?.highlight ? "text-white" : "text-text-subHeader"
        }`}
      >
        {plan.period}
      </p>

      <p
        className={`text-sm leading-relaxed mb-6  ${
          plan?.highlight ? "text-white" : "text-text-subHeader"
        }`}
      >
        {plan.description}
      </p>
      <div
        className={`pt-8 border-t ${
          plan?.highlight ? "border-t-white" : "border-t-text-subHeader"
        }`}
      ></div>
      <MainBtn
        onClick={handleNavigateClick}
        bg={
          plan.highlight
            ? "bg-white text-black"
            : index === 0
            ? "bg-orange-400 text-white"
            : ""
        }
        text="more"
      />
    </div>
  );
}
