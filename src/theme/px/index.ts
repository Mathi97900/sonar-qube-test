import {
  borderWidths,
  breakpoints,
  sizes,
  space,
  marginSpacing
} from './layout';
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights
} from './typography';
import { radii, shadows } from './misc';
import styles from './styles';
import colors from './colors';
import variants from './variants';
import initButtons from './variants/buttons';
import { Theme } from './types';

/// Swan Theme ///

export const syze: Theme = {
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  sizes,
  shadows,
  space,
  radii,
  styles,
  marginSpacing,
  variants: {
    ...variants
  }
};

syze.buttons = initButtons(syze);

export default syze;
