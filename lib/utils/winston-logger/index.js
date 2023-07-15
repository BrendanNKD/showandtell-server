"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errLogger = exports.infoLogger = void 0;
const winston_1 = require("winston");
const custom_format_1 = __importDefault(require("./custom-format"));
const levels_1 = require("./levels");
exports.infoLogger = (0, winston_1.createLogger)({
    format: custom_format_1.default,
    transports: levels_1.infolevel,
});
exports.errLogger = (0, winston_1.createLogger)({
    format: custom_format_1.default,
    transports: levels_1.errorlevel,
});
