import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { Layout, Profile } from './components/commons';
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
      <Layout hasTabBar={true}>
        <Home></Home>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
