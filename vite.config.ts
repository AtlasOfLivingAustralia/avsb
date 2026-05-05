// import react from '@vitejs/plugin-react-swc';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import babel from '@rolldown/plugin-babel';
// import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    // unstableRolldownAdapter(analyzer())
  ],
  resolve: {
    tsconfigPaths: true
  },
  envDir: './config',
});
