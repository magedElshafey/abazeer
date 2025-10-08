import Guard from "./Guard";
import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import Logout from "@/features/user/pages/Logout";
import AllProducts from "@/features/products/pages/AllProducts";

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
      path: "about-us",
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
      path: "static/:slug",
      element: lazyLoad(
        () => import("../features/static-pages/pages/ShowPage")
      ),
      handle: {
        breadcrumb: "static page name",
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
              element: lazyLoad(
                () => import("../features/user/pages/addresses/Addresses")
              ),
            },
            {
              path: ":id/edit",
              element: lazyLoad(
                () => import("../features/user/pages/addresses/AddressForm")
              ),
              handle: { breadcrumb: "update_address" },
            },
            {
              path: "create",
              element: lazyLoad(
                () => import("../features/user/pages/addresses/AddressForm")
              ),
              handle: { breadcrumb: "create_address" },
            },
          ],
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
      path: "contact-us",
      element: lazyLoad(() => import("../features/contact/pages/Contact")),

      handle: {
        breadcrumb: "contact",
      },
    },
    {
      path: "category/:slugAndId",

      element: lazyLoad(
        () => import("../features/categories/pages/CategoryDetails")
      ),

      handle: {
        breadcrumb: "category name",
      },
    },
    {
      path: "products",
      children: [
        {
          index: true,
          element: <AllProducts />
        },
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
    {
      path: "checkout",
      element: lazyLoad(() => import("../features/checkout/pages/Checkout")),

      handle: {
        breadcrumb: "checkout",
      },
    },
  ],
};
