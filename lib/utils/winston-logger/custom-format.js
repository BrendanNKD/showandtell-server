"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// custom format
const customFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({
    stack: true,
}), winston_1.format.printf((info) => `[ ${info.level.toUpperCase()} ] ${info.timestamp}: ${info.message}${info.stack ? "\n" : ""}${info.stack ? info.stack : ""}\n`));
exports.default = customFormat;
