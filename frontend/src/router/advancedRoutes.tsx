import { routerType } from "../types/router.types";
import { lazy } from "react";
import Browse from "../pages/Browse/index";
import Product from "../pages/Product/index";
const Order = lazy(() => import("../pages/Order/index"));

const advancedRoutes: routerType[] = [
  {
    title: "browse",
    path: "/search/:searchTerm",
    element: <Browse />,
  },
  {
    title: "detail",
    path: "/article/:productId",
    element: <Product />,
  },
  {
    title: "order",
    path: "thankyou/:orderId",
    element: <Order />,
  },
];

export default advancedRoutes;
