import { RootRouter } from '@routing/RootRouter';
import { RegisterServices } from '@services/ServiceLocator';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { AppContextProvider } from './AppContext';

const queryClient = new QueryClient()

function App() {
  const services = RegisterServices();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider services={services}>
        <RootRouter />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
