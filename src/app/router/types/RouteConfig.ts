import { ReactElement } from 'react';

export type RouteConfig = {
  path: string;
  name: string;
  element: ReactElement;
  isHeaderDisplay: boolean;
};
