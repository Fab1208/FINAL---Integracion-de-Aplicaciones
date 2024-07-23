import express from "express";
import morgan from "morgan";
import techstore from "./routes/techstore.routes";
import cors from "cors";

const app = express();
app.use(cors());

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.json());

app.use(techstore);

export default app;
