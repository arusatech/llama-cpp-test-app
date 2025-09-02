import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.annadata.llamacpptest',
  appName: 'LlamaCpp Test',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Add any plugin-specific configuration here
  }
};

export default config;
