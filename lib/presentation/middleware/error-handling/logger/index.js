"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_logger_1 = require("../../../../utils/winston-logger");
const errorLogger = (err, req, res, next) => {
    winston_logger_1.errLogger.error(err);
    next(err); // calling next middleware
};
exports.default = errorLogger;
