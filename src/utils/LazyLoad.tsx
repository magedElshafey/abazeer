import { Suspense, lazy } from "react";

export const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  fallback: React.ReactNode = <div>Loading...</div>
) => {
  const Component = lazy(factory);
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};
