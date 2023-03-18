import { heading } from './typography';

export default {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body'
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  p: {
    fontSize: 1
  },
  h1: {
    ...heading,
    fontSize: 6,
    mt: 2
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2
  },
  h3: {
    ...heading,
    fontSize: 4,
    mt: 3
  },
  h4: {
    ...heading,
    fontSize: 3
  },
  h5: {
    ...heading,
    fontSize: 2
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 2
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3
  }
};
