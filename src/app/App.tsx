import {MainLayout} from '../shared/layouts/MainLayout';
import {Header} from '../widgets/Header';
import {AppRouter, useRouteParams} from './router';
import {useNetworkSetup} from '../features/Network';
import {useAppSynchronization} from './synchronization';

function App() {
	const {name, isHeaderDisplay} = useRouteParams();
	const {startSynchronization} = useAppSynchronization();
	useNetworkSetup(startSynchronization);

	return (
		<MainLayout
			isHeaderDisplay={isHeaderDisplay}
			header={<Header pageName={name} />}
			content={<AppRouter />}
		/>
	);
}

export default App;
