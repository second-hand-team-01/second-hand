import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { Profile } from './components';
import { theme } from '@styles/GlobalStyle';
import { Icon } from './components';
import '@styles/index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <Profile
        size={40}
        isEditable={true}
        url="https://developer.apple.com/assets/elements/icons/sf-symbols-2/sf-symbols-2-48x48_2x.png"
        onClick={() => console.log('d')}
      ></Profile>
      <Icon name="home"></Icon>
    </ThemeProvider>
  );
}

export default App;
