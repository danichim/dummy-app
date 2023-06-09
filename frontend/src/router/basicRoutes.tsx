import { routerType } from "../types/router.types";
import { lazy } from "react";

import Home from "../pages/Home/index";
const Contact = lazy(() => import("../pages/Contact/index"));
const Checkout = lazy(() => import("../pages/Checkout/index"));

const basicRoutes: routerType[] = [
  {
    title: "home",
    path: "",
    element: <Home />,
  },
  {
    title: "contact",
    path: "contact",
    element: <Contact />,
  },
  {
    title: "checkout",
    path: "checkout",
    element: <Checkout />,
  },
];

export default basicRoutes;
