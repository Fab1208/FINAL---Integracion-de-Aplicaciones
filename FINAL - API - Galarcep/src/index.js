import app from "./app";
import { crearToken } from "../src/utils/jsonWebToken";

const main = () => {
  crearToken();
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
};

main();
