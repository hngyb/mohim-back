import dotenv from 'dotenv';

dotenv.config();
export const jwtConstants = {
  ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
};
