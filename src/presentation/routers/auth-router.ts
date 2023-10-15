import express, { Request, Response, NextFunction } from "express";
import { AuthUserUseCase } from "../../domain/interfaces/use-case/auth";
import setAuthCookies from "../../utils/cookie/setAuthCookie";
import captchaMiddleware from "../middleware/captcha/captcha";
import { authMiddleware } from "../middleware/auth/auth";
import clearAuthCookie from "../../utils/cookie/clearAuthCookie";

export default function AuthRouter(authUserUseCase: AuthUserUseCase) {
  const router = express.Router();

  router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { password, username, profiles, email } = req.body;

        const result = await authUserUseCase.executeCreateUser({
          profiles,
          password,
          email,
          username,
        });

        if (result)
          res.status(201).json({ message: "Account Successfully created" });
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/confirmSignup",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, otp } = req.body;

        const result = await authUserUseCase.executeConfirmSignup(
          username,
          otp
        );

        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/resendConfirmationCode",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username } = req.body;

        const result = await authUserUseCase.executeResendConfirmationCode(
          username
        );

        res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/forgotPassword",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username } = req.body;

        const result = await authUserUseCase.executeResetPassword(username);

        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/confirmForgotPassword",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { password, otp, username } = req.body;

        const result = await authUserUseCase.executeConfirmResetPassword(
          username,
          password,
          otp
        );

        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/changePassword",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { previousPassword, proposedPassword } = req.body;

        const accessToken = req.cookies.access_token;

        const result = await authUserUseCase.executeChangePassword(
          accessToken,
          previousPassword,
          proposedPassword
        );

        res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/login",
    //captchaMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;

        if (!username || !password) {
          res.status(400).send();
          return;
        }

        const result = await authUserUseCase.executeLogin(username, password);

        setAuthCookies(res, {
          idToken: result.AuthenticationResult.IdToken,
          accessToken: result.AuthenticationResult.AccessToken,
          refreshToken: result.AuthenticationResult.RefreshToken,
        });

        res.status(200).json(true);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/logout",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        clearAuthCookie(res);
        res.status(200).json(true);
      } catch (err: any) {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  );

  router.post(
    "/session",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(true);
      } catch (err: any) {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  );

  return router;
}
