import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'host',
  remotes: [
    'auth',
    'global-store',
    'supplier-portal',
    'data-steward-portal',
    'shop',
  ],
};

export default config;
