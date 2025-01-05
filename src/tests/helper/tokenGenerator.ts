//import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";

require('dotenv').config();

export const generateToken = (
  email: string,
  familyFileId: string
): string => {
  const jwtSecret:string = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return sign(
    {
      email,
      familyFileId
    },
    jwtSecret
  );
};
