import { Request, Response, NextFunction } from "express";
import verifyCaptcha from "../../../utils/hcaptcha/verify-captcha";

const captchaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // disable captcha verification for local development
  if (process.env.ENVIRONMENT === "dev") {
    next();
    return;
  }

  const captchaToken = (req.headers["captcha-token"] as string) || "";
  if (captchaToken === "") {
    // if no token at all means no authentication
    res
      .status(400)
      .json({ success: false, error: "Captcha token is not defined" });
  } else {
    // verifying token to see if token valid
    try {
      // token verified go to next function
      const result = await verifyCaptcha(captchaToken);
      if (result) {
        next();
        return;
      }

      res.status(400).json({ success: false, error: "Invalid captcha token" });

      return;
    } catch (e) {
      // you are forbidden to access the service or your token is not verified
      res
        .status(400)
        .json({ statusCode: 400, message: "Invalid captcha token" });
    }
  }
};

export default captchaMiddleware;
