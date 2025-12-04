import { Button, Chip, createTheme } from '@mantine/core';

const base = createTheme({
  defaultRadius: 'lg',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Lexend Deca, sans-serif',
  },
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  components: {
    Button: Button.extend({
      styles: {
        root: {
          transition: 'all ease-in 150ms',
        },
      },
    }),
    Chip: Chip.extend({
      styles: {
        label: {
          transition: 'background-color ease-in 100ms',
        },
      },
    }),
  },
});

export default base;
