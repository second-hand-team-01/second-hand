import 'styled-components';
import {
  ColorsType,
  PaletteType,
  TypographyType,
  FontWeightType,
} from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType;
    palette: PaletteType;
    typography: TypographyType;
    fontWeights: FontWeightType;
  }
}
