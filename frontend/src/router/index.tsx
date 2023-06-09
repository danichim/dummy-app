import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { routerType } from "../types/router.types";
import basicRoutes from "./basicRoutes";
import advancedRoutes from "./advancedRoutes";

import Loading from "../components/Loading";

const Router = () => {
  const allRoutes = [...basicRoutes, ...advancedRoutes];

  const pageRoutes = allRoutes.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>{pageRoutes}</Routes>
    </React.Suspense>
  );
};

export default Router;
