import {
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  InitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../../../config/config";
import { TUserRegistration } from "../../../domain/entities/auth";
import cognitoClient from "../../../infrastructure/provider/aws/cognito";

export const signUp = async (user: TUserRegistration) => {
  const { username, profiles, password, email } = user;
  const command = new SignUpCommand({
    ClientId: config.aws.cognito.clientId,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return cognitoClient.send(command);
};

export const confirmSignUp = async (username: string, otp: string) => {
  const command = new ConfirmSignUpCommand({
    ClientId: config.aws.cognito.clientId,
    Username: username,
    ConfirmationCode: otp,
  });

  return cognitoClient.send(command);
};

export const resendConfirmationCode = async (username: string) => {
  const command = new ResendConfirmationCodeCommand({
    ClientId: config.aws.cognito.clientId,
    Username: username,
  });

  return cognitoClient.send(command);
};

export const resetPassword = async (username: string) => {
  const command = new ForgotPasswordCommand({
    ClientId: config.aws.cognito.clientId,
    Username: username,
  });

  return cognitoClient.send(command);
};

export const confirmResetPassword = async (
  username: string,
  password: string,
  confirmationCode: string
) => {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: config.aws.cognito.clientId,
    Username: username,
    Password: password,
    ConfirmationCode: confirmationCode,
  });

  return cognitoClient.send(command);
};

export const changePassword = async (
  accessToken: string,
  previousPassword: string,
  proposedPassword: string
) => {
  const command = new ChangePasswordCommand({
    AccessToken: accessToken,
    PreviousPassword: previousPassword,
    ProposedPassword: proposedPassword,
  });

  return cognitoClient.send(command);
};

export const login = async (username: string, password: string) => {
  const command = new InitiateAuthCommand({
    ClientId: config.aws.cognito.clientId,
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: { USERNAME: username, PASSWORD: password },
  });

  return cognitoClient.send(command);
};

// export const logout = async (accessToken: string) => {
//   return cognitoClient.send(command);
// };
