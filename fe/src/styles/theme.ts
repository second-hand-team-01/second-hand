import { DefaultTheme } from 'styled-components';
import { colors, palette } from '@styles/Color';
import { typography, fontWeights } from '@styles/Typography';

export type ColorsType = typeof colors;
export type PaletteType = typeof palette;
export type TypographyType = typeof typography;
export type FontWeightType = typeof fontWeights;

export const theme: DefaultTheme = {
  colors,
  palette,
  typography,
  fontWeights,
};
