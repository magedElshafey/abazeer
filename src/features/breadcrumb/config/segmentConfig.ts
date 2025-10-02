import type { BreadcrumbSegmentConfig } from "../types/breadcrumb.types";

// Breadcrumb segment configuration
export const segmentConfig: Record<string, BreadcrumbSegmentConfig> = {
  "/": { label: "home" },
  "products": { label: "products" },
  "categories": { label: "categories" },
  "about": { label: "about_us" },
  "faq": { label: "faq" },
  "team": { label: "team" },
  "branches": { label: "branches" },
  "my-profile": { label: "my_profile" },
  "contact": { label: "contact" }
};
