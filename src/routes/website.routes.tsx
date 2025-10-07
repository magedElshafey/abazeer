import Guard from "./Guard";
import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import Logout from "@/features/user/pages/Logout";

export const websiteRoutes: RouteObject = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/Home")),
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: "about",
      element: lazyLoad(() => import("../features/static-pages/pages/About")),
      handle: {
        breadcrumb: "About",
      },
    },
    {
      path: "offers",
      element: lazyLoad(() => import("../features/offers/pages/Offers")),
      handle: {
        breadcrumb: "offers",
      },
    },
    {
      path: "faq",
      element: lazyLoad(() => import("../features/static-pages/pages/Faq")),
      handle: {
        breadcrumb: "faq",
      },
    },
    {
      path: "team",
      element: lazyLoad(() => import("../features/static-pages/pages/Team")),
      handle: {
        breadcrumb: "team",
      },
    },
    {
      path: "branches",
      element: lazyLoad(
        () => import("../features/static-pages/pages/Branches")
      ),
      handle: {
        breadcrumb: "branches",
      },
    },
    {
      path: "my-profile",
      element: (
        <Guard requireAuth={true}>
          {lazyLoad(() => import("../features/user/layouts/profile-layout"))}
        </Guard>
      ),
      children: [
        {
          index: true,
          element: lazyLoad(() => import("../features/user/pages/Overview")),
        },
        {
          path: "orders",
          element: lazyLoad(() => import("../features/user/pages/Orders")),
          handle: { breadcrumb: "orders" },
        },
        {
          path: "settings",
          element: lazyLoad(() => import("../features/user/pages/Settings")),
          handle: { breadcrumb: "account_settings" },
        },
        {
          path: "addresses",
          handle: { breadcrumb: "my addresses" },
          children: [
            {
              index: true,
              element: lazyLoad(() => import("../features/user/pages/addresses/Addresses")),
            },
            {
              path: "create",
              element: lazyLoad(() => import("../features/user/pages/addresses/CreateAddress")),
              handle: { breadcrumb: "create_address" },
            }
          ]
        },
        {
          path: "reviews",
          element: lazyLoad(() => import("../features/user/pages/Reviews")),
          handle: { breadcrumb: "reviews" },
        },
        {
          path: "favorites",
          element: lazyLoad(() => import("../features/user/pages/Favorites")),
          handle: { breadcrumb: "favorites" },
        },
      ],
      handle: {
        breadcrumb: "my_profile",
      },
    },
    {
      path: "contact",
      element: lazyLoad(() => import("../features/contact/pages/Contact")),

      handle: {
        breadcrumb: "contact",
      },
    },
    {
      path: "products",
      children: [
        {
          path: ":id",
          element: lazyLoad(
            () => import("../features/products/pages/ProductDetails")
          ),
          handle: {
            breadcrumb: "product name",
          },
        },
      ],
      handle: {
        breadcrumb: "products",
      },
    },
    {
      path: "blogs",
      element: lazyLoad(() => import("../features/blogs/pages/Blogs")),
      children: [
        {
          path: ":id",
          element: lazyLoad(() => import("../features/blogs/pages/Blog")),
          handle: {
            breadcrumb: "blog name",
          },
        },
      ],
      handle: {
        breadcrumb: "blogs",
      },
    },
  ],
};
