import { AppRoutes } from './AppRoutes';
import { RouteConfig } from './RouteConfig';

export type RoutesConfig = {
  [key in AppRoutes]: RouteConfig;
};
