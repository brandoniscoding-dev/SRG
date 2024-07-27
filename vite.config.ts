import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SRG/',  // Assurez-vous que cette ligne correspond à votre dépôt GitHub Pages
});
