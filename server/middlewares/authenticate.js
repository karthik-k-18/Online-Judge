import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const submitPattern = /^\/\d+\/submit$/;
  if (submitPattern.test(req.url)) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 
    if (token == null) return res.sendStatus(401); 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); 
      // console.log(user)
      req.user = user.name; 
      // console.log(req.user)
      next(); 
    });
  } else {
    const authHeader = req.headers["authorization"]; // get the authorization header
    const token = authHeader && authHeader.split(" ")[1]; // get the token from the authorization header
    if (token == null) return next(); // if there isn't any token, return 401
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(); // if the token is invalid, return 403
      req.user = user; // store the user data in the request object
      next(); // pass the execution off to whatever request the client intended
    });
  }
};