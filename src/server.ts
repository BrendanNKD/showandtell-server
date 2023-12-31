import express from "express";
import cors from "cors";
import config from "./config/config";

declare global {
  namespace Express {
    export interface Request {
      userInfo: any;
      cognitoUser: any;
    }
  }
}

const bodyParser = require("body-parser");

const server = express();

const cookieParser = require("cookie-parser");

server.use(cookieParser());
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

server.use(
  cors({
    origin: config.domain,
    credentials: true,
  })
);

server.use(express.json());

export default server;
