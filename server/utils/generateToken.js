import jwt from "jsonwebtoken";

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

export default generateToken;
