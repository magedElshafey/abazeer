import { Suspense, lazy } from "react";
const TransparentFallback = () => (
  <div className="fixed inset-0 bg-white/5 backdrop-blur-sm" />
);
export const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const Component = lazy(factory);
  return (
    <Suspense fallback={<TransparentFallback />}>
      <Component />
    </Suspense>
  );
};
