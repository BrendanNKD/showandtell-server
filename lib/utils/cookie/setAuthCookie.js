"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setAuthCookies = (res, jwtToken) => {
    // set id token
    res.cookie("id_token", jwtToken.idToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true,
        // domain: "https://whateyesee.netlify.app",
        path: "/",
        sameSite: "none",
    });
    // set jwt cookie
    res.cookie("access_token", jwtToken.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true,
        // domain: "https://whateyesee.netlify.app",
        path: "/",
        sameSite: "none",
    });
    // set refresh token
    res.cookie("refresh_token", jwtToken.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        secure: true,
        // domain: "https://whateyesee.netlify.app",
        path: "/",
        sameSite: "none",
    });
};
exports.default = setAuthCookies;
