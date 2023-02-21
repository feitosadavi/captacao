import {
  gray,
  blue,
  red,
  green,
  sand,
  mauveDark,
  yellow,
  violet,
  blackA,
  whiteA,
  slate,
  orange
} from '@radix-ui/colors';

import { createStitches } from '@stitches/react';

import type * as Stitches from '@stitches/react';
export type { VariantProps } from '@stitches/react';
export type CSS = Stitches.CSS<typeof config>;

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...sand,
      ...mauveDark,
      ...yellow,
      ...violet,
      ...blackA,
      ...whiteA,
      ...slate,
      ...orange

    },
    radii: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      full: '100%'
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    shadows: {
      1: `0 2px 10px ${blackA.blackA7}`,
      2: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px'
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
      4: '17px',
      5: '19px',
      6: '21px',
      7: '27px',
      8: '35px',
      9: '59px',
    },
    fontWeights: {
      bold: 500,
      bolder: 700,
      superBold: 900
    },
    fonts: {
      primary: 'DM Sans'
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp25: '(max-width: 900px)',
    bp3: '(max-width: 1024px)',
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    bbr: (value: string) => ({
      borderBottomLeftRadius: value,
      borderBottomRightRadius: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value
    }),
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value
    }),
  }
})

