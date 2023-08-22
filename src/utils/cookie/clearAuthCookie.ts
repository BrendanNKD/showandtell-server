import { Response } from "express";

const clearAuthCookie = (res: Response) => {
  res.clearCookie("id_token");
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
};

export default clearAuthCookie;
