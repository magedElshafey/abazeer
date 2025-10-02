import { createRoot } from "react-dom/client";
import "./style/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/tanstack-react-query/queryClient";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LanguageProvider from "./store/LanguageProvider";
import { Toaster } from "sonner";
import { router } from "./routes/index";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster position="top-center" richColors closeButton duration={3000} />
        <RouterProvider router={router} />
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
