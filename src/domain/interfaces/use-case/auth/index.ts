import { TUserRegistration } from "../../../entities/auth";

export interface AuthUserUseCase {
  executeCreateUser(user: TUserRegistration): Promise<boolean>;

  executeConfirmSignup(username: string, otp: string): Promise<boolean>;

  executeResendConfirmationCode(username: string): Promise<boolean>;

  executeResetPassword(username: string): Promise<boolean>;

  executeConfirmResetPassword(
    username: string,
    confirmationCode: string,
    password: string
  ): Promise<boolean>;

  executeChangePassword(
    accessToken: any,
    previousPassword: string,
    proposedPassword: string
  ): Promise<boolean>;

  executeLogin(username: string, password: string): Promise<any>;
}
