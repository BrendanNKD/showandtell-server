"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infolevel = exports.errorlevel = void 0;
const winston_1 = require("winston");
const config_1 = __importDefault(require("../../config/config"));
const path_1 = require("./path");
exports.errorlevel = config_1.default.environment === "dev"
    ? [new winston_1.transports.Console({ level: "debug" })]
    : [
        new winston_1.transports.File({ filename: path_1.errorPath, level: "error" }),
        new winston_1.transports.File({ filename: path_1.combinedPath, level: "info" }),
    ];
exports.infolevel = config_1.default.environment === "dev"
    ? [new winston_1.transports.Console({ level: "debug" })]
    : [
        new winston_1.transports.File({ filename: path_1.infoPath, level: "info" }),
        new winston_1.transports.File({ filename: path_1.combinedPath, level: "info" }),
    ];
