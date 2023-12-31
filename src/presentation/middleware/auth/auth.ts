import { Request, Response, NextFunction } from "express";
import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "../../../infrastructure/provider/aws/cognito";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import config from "../../../config/config";
import { infoLogger } from "../../../utils/winston-logger";

export const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: String(config.aws.cognito.userPoolId), // mandatory
  tokenUse: "access",
  clientId: String(config.aws.cognito.clientId), // needs to be specified here or upon calling verify
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.access_token || "";
  const idToken = req.cookies.id_token || "";
  const refreshToken = req.cookies.refresh_token || "";

  // if (accessToken === "" && idToken === "" && refreshToken) {
  //   console.log("expired");
  //   // res.status(440).send({ success: false, error: "Session expired" });
  //   next();
  // } else
  try {
    const input = {
      // GetUserRequest
      AccessToken: accessToken, // required
    };

    const command = new GetUserCommand(input);

    const cognitoUser = await cognitoClient.send(command);

    req.cognitoUser = cognitoUser;

    // has username
    const userInfo = await jwtVerifier.verifySync(String(accessToken));
    req.userInfo = userInfo;

    next();
  } catch (err) {
    // you are forbidden to access the service or your token is not verified
    res.status(404).json({ statusCode: 404, message: "Forbidden" });
  }
};
