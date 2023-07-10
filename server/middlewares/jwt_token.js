import jwt from "jsonwebtoken";

export const generateToken = (username, role) => {
  return jwt.sign(
    {
      name: username,
      role: role,
    },
    process.env.JWT_SECRET ,
    {
      expiresIn: "1h",
    }
  );
};
