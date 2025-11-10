import { Suspense, lazy } from "react";

const TransparentFallback = () => (
  <div className="fixed inset-0 bg-white/5 backdrop-blur-sm" />
);

// Utility: retry a dynamic import
function retryImport<T>(
  factory: () => Promise<T>,
  retries = 2,
  delay = 1000
): Promise<T> {
  return factory().catch((err) => {
    if (retries === 0) {
      // If the module completely failed, force reload to fix the broken cache
      console.error("Lazy module failed to load. Reloading app...");
      window.location.reload();                                                                                                                                     
      throw err;
    }
    console.warn(`Retrying lazy import... (${retries} left)`);
    return new Promise((resolve) =>
      setTimeout(() => resolve(retryImport(factory, retries - 1, delay)), delay)
    );
  });
}

export const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const Component = lazy(() => retryImport(factory));
  return (
    <Suspense fallback={<TransparentFallback />}>
      <Component />
    </Suspense>
  );
};
