import {MainLayout} from "../shared/layouts/MainLayout";
import {Header} from "../widgets/Header";
import AppRouter from "./router/ui/AppRouter";
import {useNetworkSetup} from "../shared/lib";

function App() {
  useNetworkSetup();

  return (
    <MainLayout
      header={<Header />}
      content={<AppRouter />}
    />
  );
}

export default App;
