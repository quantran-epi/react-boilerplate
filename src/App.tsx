import { Helmet } from '@components/Layout/Helmet';
import { RootRouter } from '@routing/RootRouter';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.less';
import { ErrorBoundary } from './ErrorBoundary';
import { GlobalHandler } from './GlobalHandler';
import { initI18n } from './I18n/init';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
initI18n();

function App() {
  const { t } = useTranslation("Common");

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <GlobalHandler />
        <Helmet title={t("TopNavigation.AppName")} />
        <RootRouter />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
