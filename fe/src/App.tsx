import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { theme } from '@styles/theme';
import '@styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './constants/routes';
import { UserContextProvider } from '@stores/UserContext';

function App() {
  // if (process.env.NODE_ENV === 'development') {
  //   const { worker } = require('@mocks/browser');
  //   worker.start();
  // }

  console.log(process.env);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
