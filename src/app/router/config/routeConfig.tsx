import {StoragesPage} from '../../../pages/StoragesPage';
import {NotFoundPage} from '../../../pages/NotFoundPage';
import {AppRoutes} from '../types/AppRoutes';
import {RoutesConfig} from '../types/RoutesConfig';

export const RoutePath = {
	[AppRoutes.STORAGES]: '/',
	[AppRoutes.NOT_FOUND]: '*',
};

export const routesConfig: RoutesConfig = {
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

