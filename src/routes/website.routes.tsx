import Guard from "./Guard";
import { lazyLoad } from "../utils/LazyLoad";

export const websiteRoutes = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/website/Home")),
    },
    {
      path: "about",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/About")
      ),
    },
    {
      path: "faq",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Faq")
      ),
    },
    {
      path: "team",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Team")
      ),
    },
    {
      path: "branches",
      element: lazyLoad(
        () => import("../features/static-pages/website/pages/Branches")
      ),
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
    },
  ],
};
