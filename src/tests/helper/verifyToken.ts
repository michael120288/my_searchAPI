import * as jwt from 'jsonwebtoken';

export const verifyToken = (token: string): boolean => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    // Verify the token's validity
    const decoded = jwt.verify(token, jwtSecret);
    console.log(`[INFO] Token is valid. Decoded payload:`, decoded);
    return true;
  } catch (error) {
    console.error(`[ERROR] Token verification failed:`, error.message);
    return false;
  }
};