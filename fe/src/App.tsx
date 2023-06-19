import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { Profile } from './components/commons';
import { theme } from '@styles/theme';
import { Icon } from './components/commons';
import '@styles/index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Profile
        size={40}
        isEditable={true}
        url="https://developer.apple.com/assets/elements/icons/sf-symbols-2/sf-symbols-2-48x48_2x.png"
        onClick={() => console.log('d')}
      />
      <Icon name="home" />
    </ThemeProvider>
  );
}

export default App;
