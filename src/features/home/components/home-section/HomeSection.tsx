import React, { memo } from "react";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import Slider from "@/common/components/slider/Slider";
import { UseQueryResult } from "@tanstack/react-query";

interface HomeSectionProps<TItem, TProps> {
  title: string;
  queryResult: UseQueryResult<TItem[], unknown>;
  skeletonType: "product" | "category" | "brand" | "testimonail";
  CardComponent: React.ComponentType<TProps>;
  getCardProps: (item: TItem) => TProps;
  breakPoints?: Record<string, any>;
}

const defaultBreakPoints = {
  "(min-width: 1280px)": { slides: { perView: 6, spacing: 16 } },
  "(max-width: 1280px)": { slides: { perView: 5, spacing: 16 } },
  "(max-width: 1024px)": { slides: { perView: 4, spacing: 16 } },
  "(max-width: 768px)": { slides: { perView: 2, spacing: 16 } },
  "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
};

function HomeSection<TItem, TProps>({
  title,
  queryResult,
  skeletonType,
  CardComponent,
  getCardProps,
  breakPoints = defaultBreakPoints,
}: HomeSectionProps<TItem, TProps>) {
  const data = queryResult.data ?? [];

  return (
    <section
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
      className="py-8"
    >
      <FetchHandler queryResult={queryResult} skeletonType={skeletonType}>
        {data?.length > 0 && (
          <Slider
            key={data?.length}
            title={title}
            loop
            spacing={10}
            breakPoints={breakPoints}
          >
            {data.map((item: TItem, index: number) => (
              <CardComponent
                key={(item as any)?.id ?? index}
                {...getCardProps(item)}
              />
            ))}
          </Slider>
        )}
      </FetchHandler>
    </section>
  );
}

export default memo(HomeSection) as typeof HomeSection;
