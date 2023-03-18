import { Global } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Theme } from '../../theme/px/types';
import { letterSpacings } from '../../theme/px/typography';

function GlobalStyle() {
  const theme = useTheme<Theme>();
  return (
    <Global styles={{
      html: {
        fontSize: theme.fontSizes[1],
        letterSpacing: letterSpacings.normal
      },
      body: {
        margin: 0,
        fontFamily: theme.fonts.body,
        lineHeight: theme.lineHeights.body,
        color: theme.colors.text
      }
    }}
    />
  );
}

export default GlobalStyle;
