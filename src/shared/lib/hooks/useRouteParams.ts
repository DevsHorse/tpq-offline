import {AppRoutes, RoutesConfigType, routesConfig, ConfigRoute} from "../../config";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

type UseRouteNameReturnType = {name: string, isHeaderDisplay: boolean};

export const useRouteParams = (): UseRouteNameReturnType => {
  const [name, setName] = useState<string>('');
  const [isHeaderDisplay, setIsHeaderDisplay] = useState<boolean>(true);
  const location = useLocation();

  const getActiveRoute = useCallback((routes: RoutesConfigType, path: string): ConfigRoute | null => {
    let routesKeys = Object.keys(routes) as AppRoutes[];

    for (const key of routesKeys) {
      const isAnyRouteMatch = routes[key].path === '*';
      const isGeneralRouteMatch = routes[key].path === '/' && path === '/';
      const isAnotherRouteMatch = routes[key].path !== '/' && path.indexOf(routes[key].path) !== -1;
      if (isAnyRouteMatch || isGeneralRouteMatch || isAnotherRouteMatch) {
        return routes[key];
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const route = getActiveRoute(routesConfig, location.pathname);
    setName(route ? route.name : '');
    setIsHeaderDisplay(route ? route.isHeaderDisplay : false);
  }, [location.pathname, getActiveRoute]);

  return {
    name,
    isHeaderDisplay
  }
}