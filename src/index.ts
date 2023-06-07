import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from "./config";
import { connectMongoDB } from "./db";
import { postRouter, userRouter } from "./router";
import path from "path";
dotenv.config();
connectMongoDB();

const app: Express = express();
const port: string | number = config.serverPort;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user/v1", userRouter);
app.use("/api/post/v1", postRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello, node!");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
