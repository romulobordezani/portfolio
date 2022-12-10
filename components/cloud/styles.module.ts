import { Theme } from '@mui/system/createTheme';

export type CustomBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hl';

export type DynamicPosition = {
  [key: string]: number;
};

const cloudPositions: { [key: number]: DynamicPosition } = {
  0: {
    xs: -100,
    sm: -200,
    md: -300,
    lg: -400,
    xl: 300,
    hl: -1000,
  },
  1: {
    xs: -100,
    sm: -200,
    md: -300,
    lg: -400,
    xl: -60,
    hl: -9000,
  },
  2: {
    xs: -100,
    sm: -200,
    md: -300,
    lg: -400,
    xl: 300,
    hl: -1000,
  },
  3: {
    xs: -100,
    sm: -200,
    md: -300,
    lg: -400,
    xl: 300,
    hl: -1000,
  },
  4: {
    xs: -100,
    sm: -200,
    md: -300,
    lg: -400,
    xl: 300,
    hl: -1000,
  },
};

const getCloudPosition = (
  id: number,
  breakpoint: CustomBreakpoints
): number => {
  return cloudPositions[id][breakpoint];
};

export const cloudStyle = (id: number, theme: Theme) => {
  return {
    background: `transparent url("../../images/parallax/cloud-${id}-min.png") no-repeat`,
    backgroundSize: 'contain',
    opacity: `0.9`,
    width: '100%',
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      backgroundPositionX: getCloudPosition(id, 'xs'),
    },
    [theme.breakpoints.only('sm')]: {
      backgroundPositionX: getCloudPosition(id, 'sm'),
    },
    [theme.breakpoints.only('md')]: {
      backgroundPositionX: getCloudPosition(id, 'md'),
    },
    [theme.breakpoints.only('lg')]: {
      backgroundPositionX: getCloudPosition(id, 'lg'),
    },
    [theme.breakpoints.only('xl')]: {
      backgroundPositionX: getCloudPosition(id, 'xl'),
    },
    [theme.breakpoints.up(2000)]: {
      backgroundPositionX: getCloudPosition(id, 'hl'),
    },
  };
};
