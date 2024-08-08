import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or another plugin depending on your setup

export default defineConfig({
  plugins: [react()],
  base: '/BugTracker/'  // Set the base path to your repository name
});
