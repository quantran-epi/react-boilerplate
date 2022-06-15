import { Helmet } from '@components/Layout/Helmet';
import { RootRouter } from '@routing/RootRouter';
import { RegisterServices } from '@services/ServiceLocator';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './AppContext';
import { ErrorBoundary } from './ErrorBoundary';
import { initI18n } from './I18n/init';
import './App.less'

const queryClient = new QueryClient()
initI18n();

function App() {
  const services = RegisterServices();
  const { t } = useTranslation("Common");

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider services={services}>
        <ErrorBoundary>
          <Helmet title={t("TopNavigation.AppName")} />
          <RootRouter />
        </ErrorBoundary>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
