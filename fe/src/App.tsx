import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { Profile } from './components/commons';
import { theme } from '@styles/GlobalStyle';
import { Icon } from './components/commons';
import { Home } from '@pages/index';
import '@styles/index.css';

function App() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('@mocks/browser');
    worker.start();
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home></Home>
    </ThemeProvider>
  );
}

export default App;
