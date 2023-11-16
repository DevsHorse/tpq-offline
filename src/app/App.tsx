import {MainLayout} from "../shared/layouts/MainLayout";
import {Header} from "../widgets/Header";
import AppRouter from "./router/ui/AppRouter";

function App() {
  return (
    <MainLayout
      header={<Header />}
      content={<AppRouter />}
    />
  );
}

export default App;
