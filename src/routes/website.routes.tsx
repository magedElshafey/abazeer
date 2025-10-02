import Guard from "./Guard";
import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";

export const websiteRoutes: RouteObject = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/website/Home")),
      handle: {
        breadcrumb: "home",
      },
    },
    {
      path: "about",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/About")
      ),
      handle: {
        breadcrumb: "about"
      }
    },
    {
      path: "faq",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Faq")
      ),
      handle: {
        breadcrumb: "faq"
      }
    },
    {
      path: "team",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Team")
      ),
      handle: {
        breadcrumb: "team"
      }
    },
    {
      path: "branches",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Branches")
      ),
      handle: {
        breadcrumb: "branches"
      }
    },
    {
      path: "my-profile",
      element: (
        <Guard requireAuth={true}>
          {lazyLoad(
            () => import("../features/user/website/my-profile/MyProfile")
          )}
        </Guard>
      ),
      handle: {
        breadcrumb: "my_profile"
      }
    },
  ],
};
