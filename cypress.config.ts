import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config): any {
      return {
        browsers: config.browsers.filter(
          (b) => b.family === 'chromium' && b.name !== 'electron',
        ),
      };
    },
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
  },
  video: false,
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
