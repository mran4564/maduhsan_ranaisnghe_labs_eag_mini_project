import dotenv from 'dotenv';

dotenv.config();

const config = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  productApi: process.env.PRODUCTS_BASE_URL || '',
  categoryApi: process.env.CATEGORY_BASE_URL || '',
  orderApi: process.env.ORDER_BASE_URL || '',
  orderItemApi: process.env.ORDER_ITEM_BASE_URL || '',
  cartApi: process.env.CART_BASE_URL || '',
  userApi: process.env.USER_BASE_URL || '',
  cognitoUserPoolId: process.env.AWS_USER_POOL_ID || '',
  cognitoClientId: process.env.AWS_COGNITO_CLIENT_ID || '',
  cognitoRegion: process.env.AWS_COGNITO_REGION || '',
};

export default config;
