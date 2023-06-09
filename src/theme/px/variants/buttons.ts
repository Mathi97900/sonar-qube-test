import { themeGet } from '@styled-system/theme-get';
import { Theme } from '../types';

export default (theme: Theme) => ({
  gradient: {
    background: themeGet('colors.gradient')({ theme }),
    color: 'white'
  },
  light: {
    backgroundColor: 'light',
    color: 'primary'
  },
  white: {
    backgroundColor: 'white',
    color: 'primary'
  },
  disabled: {
    backgroundColor: '#d7d7d7',
    color: '#8a8a8a',
    cursor: 'not-allowed'
  },
  primary: {
    backgroundColor: 'primary',
    color: 'white'
  },
  secondary: {
    backgroundColor: 'secondary',
    color: 'primary'
  },
  'transparent-white': {
    backgroundColor: 'transparent',
    color: 'white'
  },
  'transparent-primary': {
    backgroundColor: 'transparent',
    color: 'primary'
  },
  pink: {
    backgroundColor: '#D16BA5',
    color: 'white'
  },
  'outline-primary': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary',
    color: 'primary'
  },
  outline: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary',
    color: 'primary'
  },
  discord: {
    backgroundColor: 'discord',
    color: 'white'
  },
  grayButton: {
    backgroundColor: '#D0D0D0',
    color: '#0C0C0C'
  },
  activeGarments: {
    color: '#fff',
    fontSize: '18px',
    fontFamily: 'AvenirLTPro-Heavy',
    background: '#5932F3',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 900
  }
});
