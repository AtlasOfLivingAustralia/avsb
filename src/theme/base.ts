import { createTheme, DrawerRoot, Modal } from '@mantine/core';

const base = createTheme({
  defaultRadius: 'lg',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Lexend Deca, sans-serif',
  },
  components: {
    Modal: Modal.extend({
      defaultProps: {
        zIndex: 600,
      },
    }),
    DrawerRoot: DrawerRoot.extend({
      defaultProps: {
        zIndex: 600,
      },
    }),
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
});

export default base;
