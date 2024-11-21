import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/envVar.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VAR.JWT_SECRET, { expiresIn: "10d" });

  res.cookie("jwt-netflix", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10d in ms
    httpOnly: true, // prevent XSS attacks, cant be accessed by JS
    samesite: "strict", // send cookie in request from 1 site
    secure: ENV_VAR.NODE_ENV !== "development", // if true cookie will send bt https
  });

  return token;
};
