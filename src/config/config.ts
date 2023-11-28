import dotenv from 'dotenv';

dotenv.config();

const config = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  productApi: process.env.PRODUCTS_BASE_URL || '',
  cognitoUserPoolId: process.env.AWS_USER_POOL_ID || '',
  cognitoClientId: process.env.AWS_COGNITO_CLIENT_ID || '',
  cognitoRegion: process.env.AWS_COGNITO_REGION || '',
};

export default config;
