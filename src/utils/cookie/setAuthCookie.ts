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
    secure: true,
    // domain: "https://whateyesee.netlify.app",
    path: "/",
    sameSite: "none",
  });

  // set jwt cookie
  res.cookie("access_token", jwtToken.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    secure: true,
    // domain: "https://whateyesee.netlify.app",
    path: "/",
    sameSite: "none",
  });

  // set refresh token
  res.cookie("refresh_token", jwtToken.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    secure: true,
    // domain: "https://whateyesee.netlify.app",
    path: "/",
    sameSite: "none",
  });
};

export default setAuthCookies;
