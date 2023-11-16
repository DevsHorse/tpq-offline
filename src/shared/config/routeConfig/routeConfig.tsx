import {ReactElement} from "react";
import {StoragesPage} from "../../../pages/StoragesPage";
import {NotFoundPage} from "../../../pages/NotFoundPage";

export enum AppRoutes {
  STORAGES = 'storages',
  NOT_FOUND = 'not_found',
}

export const RoutePath = {
  [AppRoutes.STORAGES]: '/',
  [AppRoutes.NOT_FOUND]: '*',
};

export type ConfigRoute = {
  path: string;
  name: string;
  element: ReactElement;
  isHeaderDisplay: boolean;
}

export type RoutesConfigType = {
  [key in AppRoutes]: ConfigRoute
}

export const routesConfig: RoutesConfigType = {
  [AppRoutes.STORAGES]: {
    name: 'Dashboard',
    path: RoutePath[AppRoutes.STORAGES],
    element: <StoragesPage />,
    isHeaderDisplay: true,
  },
  [AppRoutes.NOT_FOUND]: {
    name: 'Not found',
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
    isHeaderDisplay: false,
  },
};

