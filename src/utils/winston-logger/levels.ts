import { transports } from "winston";
import config from "../../config/config";
import { combinedPath, errorPath, infoPath } from "./path";

export const errorlevel =
  process.env.NODE_ENV === "developement"
    ? [new transports.Console({ level: "debug" })]
    : [
        new transports.File({ filename: errorPath, level: "error" }),
        new transports.File({ filename: combinedPath, level: "info" }),
      ];

export const infolevel =
  process.env.NODE_ENV === "developement"
    ? [new transports.Console({ level: "debug" })]
    : [
        new transports.File({ filename: infoPath, level: "info" }),
        new transports.File({ filename: combinedPath, level: "info" }),
      ];
