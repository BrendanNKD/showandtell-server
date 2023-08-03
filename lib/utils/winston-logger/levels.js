"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infolevel = exports.errorlevel = void 0;
const winston_1 = require("winston");
const path_1 = require("./path");
exports.errorlevel = process.env.NODE_ENV === "developement"
    ? [new winston_1.transports.Console({ level: "debug" })]
    : [
        new winston_1.transports.File({ filename: path_1.errorPath, level: "error" }),
        new winston_1.transports.File({ filename: path_1.combinedPath, level: "info" }),
    ];
exports.infolevel = process.env.NODE_ENV === "developement"
    ? [new winston_1.transports.Console({ level: "debug" })]
    : [
        new winston_1.transports.File({ filename: path_1.infoPath, level: "info" }),
        new winston_1.transports.File({ filename: path_1.combinedPath, level: "info" }),
    ];
