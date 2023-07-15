"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedPath = exports.errorPath = exports.infoPath = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config/config"));
// fall back if environment is missing
const LOG_PATH = config_1.default.winstonlogger.logPath
    ? config_1.default.winstonlogger.logPath
    : "/var/log";
const LOG_INFO_FILE = config_1.default.winstonlogger.infoFileName
    ? config_1.default.winstonlogger.infoFileName
    : "activity.log";
const LOG_ERROR_FILE = config_1.default.winstonlogger.errorFileName
    ? config_1.default.winstonlogger.errorFileName
    : "error.log";
const LOG_ALL_FILE = config_1.default.winstonlogger.combinedFileName
    ? config_1.default.winstonlogger.combinedFileName
    : "combined.log";
//define log paths
exports.infoPath = path_1.default.join(LOG_PATH, LOG_INFO_FILE);
exports.errorPath = path_1.default.join(LOG_PATH, LOG_ERROR_FILE);
exports.combinedPath = path_1.default.join(LOG_PATH, LOG_ALL_FILE);
