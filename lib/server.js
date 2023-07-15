"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const server = (0, express_1.default)();
const cookieParser = require("cookie-parser");
server.use((0, cors_1.default)());
server.use(cookieParser());
server.use(express_1.default.json());
server.use(bodyParser.urlencoded({
    extended: false,
}));
exports.default = server;
