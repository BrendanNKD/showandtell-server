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
    origin: "http://localhost:3001",
    credentials: true, // Update with the actual frontend origin
  })
);

server.use(cookieParser());

server.use(express.json());

server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

export default server;
