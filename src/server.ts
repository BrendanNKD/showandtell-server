import express from "express";
import cors from "cors";

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

server.use(
  cors({
    origin:
      "https://654a44fe61fe6732e3aa0b7f--earnest-fairy-c00ff7.netlify.app/",
    credentials: true,
  })
);

server.use(cookieParser());
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

server.use(express.json());

export default server;
