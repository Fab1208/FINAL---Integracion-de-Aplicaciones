import jwt from "jsonwebtoken";
import config from "../config";

export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
