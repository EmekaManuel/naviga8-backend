import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { dbConnect } from "./config";
import naviga8Routes from "./route";
import { errorHandler, notFound } from "./errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/api/naviga8", naviga8Routes);

//middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
