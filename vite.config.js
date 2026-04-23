import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        // Disable hashing: force static filenames
        entryFileNames: 'lagging-terminal.js',
        chunkFileNames: 'lagging-terminal.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'lagging-terminal.css';
          }
          return '[name]-[hash].[ext]';
        },
      },
    },
    // Bundle React & dependencies into the single JS
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
  },
  // Ensure React is not externalized
  resolve: {
    alias: {
      react: '/node_modules/react',
      'react-dom': '/node_modules/react-dom',
    },
  },
});
