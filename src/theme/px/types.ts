/* eslint-disable no-unused-vars */
export interface Fonts {
  button: string;
  heading: string;
  monospace: string;
  body: string;
  medium: string;
  roman: string;
}
export type BaseFontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
export type FontWeight = BaseFontWeight | 'body' | 'heading';
export type FontWeightObjectType = { [s in FontWeight]: string };
export interface LineHeights {
  relaxed: string;
  normal: string;
  heading: string;
  snug: string;
  loose: string;
  none: string;
  body: string;
  tight: string;
}
export interface LetterSpacings {
  normal: any;
  wider: string;
  widest: string;
  wide: string;
  tighter: string;
  tight: string;
}
export interface marginSpacing {}
export interface Theme {
  fonts: Fonts;
  lineHeights: LineHeights;
  fontSizes: string[];
  borderWidths: any;
  breakpoints: string[];
  colors: {
    [s: string]: any;
  };
  fontWeights: FontWeightObjectType;
  letterSpacings: LetterSpacings;
  sizes: number[] | string[] | object;
  shadows: number[] | string[] | object;
  space: number[] | string[] | object;
  marginSpacing: any;
  radii: number[] | object;
  styles: object;
  buttons?: {
    [s: string]: object;
  };
  variants: {
    [s: string]: object;
  };
}
