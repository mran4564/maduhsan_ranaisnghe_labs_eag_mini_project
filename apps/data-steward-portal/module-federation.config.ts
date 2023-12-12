import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'data-steward-portal',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  remotes: ['global-store'],
};

export default config;
