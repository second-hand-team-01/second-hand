import { ThemeProvider } from 'styled-components';
import { colors, palette } from '@styles/Color';
import { typography, fontWeight } from '@styles/Typography';

function App() {
  const theme = { ...colors, ...palette, ...typography, ...fontWeight };
  return (
    <ThemeProvider theme={theme}>
      <div>hi</div>
    </ThemeProvider>
  );
}

export default App;
