import React from "react";
import SectionTitle from "../../../../../common/components/titles/SectionTitle";
import PricingCard from "./pricing-card/PricingCard";
import type { Pricing } from "../../types/Pricing";
interface PricingProps {
  plans: Pricing[];
}
const Pricings: React.FC<PricingProps> = ({ plans }) => {
  console.log("pricing render", plans);
  return (
    <section className="w-full py-16 ">
      <div className="containerr">
        <SectionTitle title="Subscription plans" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Pricings);
