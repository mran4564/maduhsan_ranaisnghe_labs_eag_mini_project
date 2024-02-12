import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'supplier-portal',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
