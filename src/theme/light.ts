import { MantineThemeOverride } from '@mantine/core';

const lightTheme: MantineThemeOverride = {
  components: {
    Text: {
      defaultProps: (theme) => ({
        color: theme.colors.dark[5],
      }),
    },
  },
};

export default lightTheme;
