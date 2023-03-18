/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * The @types/rebass package still uses styled-components as its base,
 * causing a conflict when I use Rebass + Emotion. This file overrides
 * the offending types so that the `css` property from Emotion is
 * expected, rather than the one from styled-components.
 *
//  * Whenever a compatibility error involving the `css` property arises,
 * we can add the base component's props here to tell Typescript to use
 * the Emotion css prop instead.
 *
 * @author Rory Byrne <rory@syze.ai>
 */
import { InterpolationWithTheme } from '@emotion/core';
import React from 'react';

declare module 'rebass' {
  interface FlexProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface BoxProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface TextProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface HeadingProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface ButtonProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface ImageProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
}

declare module '@rebass/forms' {
  interface InputProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface SelectProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<any>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<any>;
    }
  }
}

declare module 'react-native' {
  interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(
      callbackfn: (
        value: FormDataEntryValue,
        key: string,
        parent: FormData
      ) => void,
      thisArg?: any
    ): void;
  }
}
