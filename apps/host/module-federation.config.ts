import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'host',
  remotes: [
    'auth',
    'global-store',
    'supplier-portal',
    'shop',
    'data-steward-portal',
  ],
};

export default config;
