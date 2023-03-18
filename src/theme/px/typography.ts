import WebFont from 'webfontloader';
import rem from './rem';
// import {getParamFromCurrentLocation} from "../../util";
import {
  Fonts, FontWeightObjectType, LetterSpacings, LineHeights
} from './types';

const defaultFont = 'AvenirLTPro-Book';
const fontsForWebFontLoader = ['Roboto'];
if (fontsForWebFontLoader.includes(defaultFont)) {
  WebFont.load({
    google: {
      families: [defaultFont]
    }
  });
}
export const fonts: Fonts = {
  body: 'AvenirLTPro-Book',
  heading: 'AvenirLTPro-Black',
  button: 'AvenirLTPro-Heavy',
  monospace: 'Menlo, Monaco',
  medium: 'AvenirLTPro-Medium',
  roman: 'AvenirLTPro-Roman'
};

export const fontSizes = [
  rem(0.875),
  rem(1),
  rem(1.25),
  rem(1.5),
  rem(2),
  rem(2.5),
  rem(3),
  rem(4),
  rem(4.5),
  rem(5),
  rem(6),
  rem(8),
  rem(10)
];

const baseFontWeights = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
};

export const fontWeights: FontWeightObjectType = {
  ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold
};

/// Text ///

const baseLineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2'
};

export const lineHeights: LineHeights = {
  ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight
};

export const letterSpacings: LetterSpacings = {
  tighter: rem(-0.05),
  tight: rem(-0.025),
  normal: '0',
  wide: rem(0.025),
  wider: rem(0.05),
  widest: rem(0.1)
};

export const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1
};
