"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const bodyParser = require("body-parser");
const server = (0, express_1.default)();
const cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use((0, cors_1.default)({
    origin: config_1.default.domain,
    credentials: true,
}));
server.use(express_1.default.json());
exports.default = server;
