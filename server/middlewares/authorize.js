import jwt from "jsonwebtoken";

export const authorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // get the authorization header
  const token = authHeader && authHeader.split(" ")[1]; // get the token from the authorization header
  if (token == null) return res.sendStatus(401); // if there isn't any token, return 401
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // if the token is invalid, return 403
    if (user.role !== "admin")
      return res
        .status(403)
        .send("Only admins are allowed to access this resource");
    req.user = user; // store the user data in the
    next(); // pass the execution off to whatever request the client intended
  });
};