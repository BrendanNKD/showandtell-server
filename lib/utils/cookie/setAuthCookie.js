"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const setAuthCookies = (res, jwtToken) => {
    // set id token
    res.cookie("id_token", jwtToken.idToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: config_1.default.environment !== "local",
        // domain: config.domain,
        domain: "http://localhost:3000",
        path: "/",
        sameSite: "strict",
    });
    // set jwt cookie
    res.cookie("access_token", jwtToken.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: config_1.default.environment !== "local",
        // domain: config.domain,
        domain: "http://localhost:3000",
        path: "/",
        sameSite: "strict",
    });
    // set refresh token
    res.cookie("refresh_token", jwtToken.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        secure: config_1.default.environment !== "local",
        // domain: config.domain,
        domain: "http://localhost:3000",
        path: "/",
        sameSite: "strict",
    });
};
exports.default = setAuthCookies;
