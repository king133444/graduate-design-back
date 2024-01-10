import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateTokens = (userId: number) => {
  // Generate an access token and a refresh token
  const accessToken = sign({ id: userId }, 'JWT_ACCESS_SECRET', {
    expiresIn: '15m',
  });
  const refreshToken = sign({ id: userId }, 'JWT_REFRESH_SECRET', {
    expiresIn: '7d',
  });

  // Return the tokens
  return { accessToken, refreshToken };
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const payload = verify(refreshToken, 'JWT_REFRESH_SECRET');
    return payload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const generateNewAccessToken = (userId: number) => {
  const newAccessToken = sign({ id: userId }, 'JWT_ACCESS_SECRET', {
    expiresIn: '15m',
  });
  return newAccessToken;
};
