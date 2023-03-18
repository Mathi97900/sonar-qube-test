// import { darkenAll } from './util'
// import {getParamFromCurrentLocation} from "../../util";

const gradients = {
  radial: 'radial-gradient(99.58% 2249.19% at 0.42% 97.85%, #D16BA5 0%, #86A8E7 27.08%, #7BC7C3 80.21%)',
  linear: 'gradient(248.88deg, #7BC7C3 -13.56%, #7BC7C3 17.1%, #85ABE3 64.08%, #86A8E7 70.5%, #D16BA5 110.03%)',
  linear2: 'linear-gradient(157.73deg, #48C6EF 0%, #6F86D6 100%)',
  lowOpacity: 'linear-gradient(157.73deg, rgba(72, 198, 239, 0.35) 0%, rgba(111, 134, 214, 0.35) 100%)'
};

const themeColors = {
  primary: '#5932F3',
  secondary: '#EDE1FF',
  accent: '#0C0C0C',
  primaryLight: '#BFEAF9',
  petrol2: '#6B6B6B',
  difference: '#E5B300',
  gradient: gradients.linear2,
  alert: '#F9812A',
  success: '#32C671',
  backgroundGray: '#E5E5E5',
  font: '#0C0C0C',
  white: '#ffffff'
};

const baseColors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: [
    '#fff',
    '#f7fafc',
    '#edf2f7',
    '#e2e8f0',
    '#cbd5e0',
    '#a0aec0',
    '#718096',
    '#4a5568',
    '#262626',
    '#1a202c'
  ],
  red: [
    '#fff',
    '#fff5f5',
    '#fed7d7',
    '#feb2b2',
    '#fc8181',
    '#f56565',
    '#e53e3e',
    '#c53030',
    '#9b2c2c',
    '#742a2a'
  ],
  orange: [
    '#fff',
    '#fffaf0',
    '#feebc8',
    '#fbd38d',
    '#f6ad55',
    '#ed8936',
    '#dd6b20',
    '#c05621',
    '#9c4221',
    '#7b341e'
  ],
  yellow: [
    '#fff',
    '#fffff0',
    '#fefcbf',
    '#faf089',
    '#f6e05e',
    '#ecc94b',
    '#d69e2e',
    '#b7791f',
    '#975a16',
    '#744210'
  ],
  green: [
    '#fff',
    '#f0fff4',
    '#c6f6d5',
    '#9ae6b4',
    '#68d391',
    '#48bb78',
    '#38a169',
    '#2f855a',
    '#276749',
    '#22543d'
  ],
  teal: [
    '#fff',
    '#e6fffa',
    '#b2f5ea',
    '#81e6d9',
    '#4fd1c5',
    '#38b2ac',
    '#319795',
    '#2c7a7b',
    '#285e61',
    '#234e52'
  ],
  blue: [
    '#fff',
    '#ebf8ff',
    '#bee3f8',
    '#90cdf4',
    '#63b3ed',
    '#4299e1',
    '#3182ce',
    '#2b6cb0',
    '#2c5282',
    '#2a4365'
  ],
  indigo: [
    '#fff',
    '#ebf4ff',
    '#c3dafe',
    '#a3bffa',
    '#7f9cf5',
    '#667eea',
    '#5a67d8',
    '#4c51bf',
    '#434190',
    '#3c366b'
  ],
  purple: [
    '#fff',
    '#faf5ff',
    '#e9d8fd',
    '#d6bcfa',
    '#b794f4',
    '#9f7aea',
    '#805ad5',
    '#6b46c1',
    '#553c9a',
    '#44337a'
  ],
  pink: [
    '#fff',
    '#fff5f7',
    '#fed7e2',
    '#fbb6ce',
    '#f687b3',
    '#ed64a6',
    '#d53f8c',
    '#b83280',
    '#97266d',
    '#702459'
  ]
};

const utilityColors = {
  background: '#0B2460',
  text: themeColors.font,
  textMuted: baseColors.gray[6],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  muted: baseColors.gray[3],
  success: '#5CCD52',
  info: '#63b3ed',
  warning: '#faf089',
  danger: '#feb2b2'
};

const brandColors = {
  discord: '#7289da'
};

const opaque = [
  '#fff',
  'rgba(0,0,0,0.1)',
  'rgba(0,0,0,0.2)',
  'rgba(0,0,0,0.3)',
  'rgba(0,0,0,0.4)',
  'rgba(0,0,0,0.5)'
];

export default {
  ...themeColors,
  ...utilityColors,
  ...brandColors,
  gradients,
  opaque
  // darken: darkenAll({primary: themeColors.primary, secondary: themeColors.secondary})
};
