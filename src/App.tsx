import { RootRouter } from '@routing/RootRouter';
import { RegisterServices } from '@services/ServiceLocator';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { AppContextProvider } from './AppContext';
import { ErrorBoundary } from './ErrorBoundary';
import { initI18n } from './I18n';

const queryClient = new QueryClient()
initI18n();

function App() {
  const services = RegisterServices();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider services={services}>
        <ErrorBoundary>
          <RootRouter />
        </ErrorBoundary>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
