import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { theme } from '@styles/theme';
import '@styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './constants/routes';

function App() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('@mocks/browser');
    worker.start();
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
