import React from 'react';
import { Heading, HeadingProps } from 'rebass';

export function Heading1({ sx, ...props }: HeadingProps) {
  return (
    <Heading
      as="h1"
      sx={{
        fontSize: [4], fontWeight: 'heading', lineHeight: '1.5', ...sx
      }}
      {...props}
    />
  );
}

export function Heading2({ sx, ...props }: HeadingProps) {
  return (
    <Heading
      as="h2"
      sx={{
        fontSize: 3, fontWeight: 'bold', lineHeight: '1.5', ...sx
      }}
      {...props}
    />
  );
}

export function Heading3({ sx, ...props }: HeadingProps) {
  return (
    <Heading
      as="h3"
      sx={{
        fontSize: 2, fontWeight: 'semibold', lineHeight: '1.5', ...sx
      }}
      {...props}
    />
  );
}

export function Heading4({ sx, ...props }: HeadingProps) {
  return (
    <Heading
      as="h4"
      sx={{
        fontFamily: 'button', fontSize: 1, fontWeight: 'extrabold', lineHeight: '1.5', ...sx
      }}
      {...props}
    />
  );
}

export function Heading5({ sx, ...props }: HeadingProps) {
  return (
    <Heading
      as="h5"
      sx={{
        fontFamily: 'button', fontSize: 1, fontWeight: 'extrabold', lineHeight: '1.5', ...sx
      }}
      {...props}
    />
  );
}
