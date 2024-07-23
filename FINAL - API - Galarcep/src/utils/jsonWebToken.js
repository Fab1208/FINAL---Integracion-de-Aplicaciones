import jwt from "jsonwebtoken";
import config from "../config";

export const crearToken = () => {
  const token = jwt.sign({ user: "admin" }, config.secret, { expiresIn: "1h" });
  console.log(token);
};
