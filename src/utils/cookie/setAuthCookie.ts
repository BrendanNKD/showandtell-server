import { Response } from "express";
import config from "../../config/config";

const setAuthCookies = (
  res: Response,
  jwtToken: { accessToken: string; idToken: string; refreshToken: string }
) => {
  // set id token
  res.cookie("id_token", jwtToken.idToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    secure: config.environment !== "local",
    // domain: config.domain,
    path: "/",
    sameSite: "strict",
  });

  // set jwt cookie
  res.cookie("access_token", jwtToken.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    secure: config.environment !== "local",
    // domain: config.domain,
    path: "/",
    sameSite: "strict",
  });

  // set refresh token
  res.cookie("refresh_token", jwtToken.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    secure: config.environment !== "local",
    // domain: config.domain,
    path: "/",
    sameSite: "strict",
  });
};

export default setAuthCookies;
