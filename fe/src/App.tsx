import { ThemeProvider } from 'styled-components';
import { colors, palette } from '@styles/Color';
import { typography, fontWeight } from '@styles/Typography';
import { GlobalStyle } from '@styles/GlobalStyle';

function App() {
  const theme = { ...colors, ...palette, ...typography, ...fontWeight };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <div>역삼1동 􀆈</div>
    </ThemeProvider>
  );
}

export default App;
