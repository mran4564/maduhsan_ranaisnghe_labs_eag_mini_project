import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'global-store',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
