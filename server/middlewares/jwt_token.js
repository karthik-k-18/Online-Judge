import jwt from "jsonwebtoken";

export const generateToken = (email, role) => {
  return jwt.sign(
    {
      email:email,
      role: role,
    },
    process.env.JWT_SECRET ,
    {
      expiresIn: "1h",
    }
  );
};
