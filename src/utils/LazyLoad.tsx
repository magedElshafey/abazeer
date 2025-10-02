import { Suspense, lazy } from "react";

export const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const Component = lazy(factory);
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};
