/**
 * Theme constants matching the PostCSS configuration
 * These values are used for JavaScript media queries and must match postcss.config.cjs
 */
export const breakpoints = {
  xs: '36em',
  sm: '48em',
  md: '62em',
  lg: '75em',
  xl: '88em',
} as const;

export type Breakpoint = keyof typeof breakpoints;
