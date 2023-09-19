import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { theme } from '@styles/theme';
import '@styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './constants/routes';
import { UserContextProvider } from '@stores/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  // if (process.env.NODE_ENV === 'development') {
  //   const { worker } = require('@mocks/browser');
  //   worker.start();
  // }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
        suspense: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
