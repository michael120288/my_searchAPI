import jwt from "jsonwebtoken";

export const generateToken = (
  email: string,
  familyFileId: string,
  key: string
): string => {
  return jwt.sign(
    {
      email,
      familyFileId,
      key
    },
    process.env.JWT_SECRET
  );
};
