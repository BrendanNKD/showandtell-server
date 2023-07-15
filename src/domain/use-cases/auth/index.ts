import { AuthUserUseCase } from "../../interfaces/use-case/auth";
import { ProfileRepository } from "../../interfaces/repositories/profile";
import { TUserRegistration } from "../../entities/auth";
import {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  resetPassword,
  confirmResetPassword,
  changePassword,
  login,
} from "../../../utils/aws/cognito/cognito-commands";
import setAuthCookies from "../../../utils/cookie/setAuthCookie";

class AuthUserUseCaseImp implements AuthUserUseCase {
  profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async executeCreateUser(user: TUserRegistration): Promise<boolean> {
    const { username, email, firstName, lastName, dateOfBirth } = user;

    // will throw error if user exist
    await signUp(user);

    // create profile
    const createdProfile = await this.profileRepository.createOneProfile({
      email,
      firstName,
      lastName,
      dateOfBirth,
      username,
    });

    if (createdProfile) return true;
    return false;
  }

  async executeConfirmSignup(username: string, otp: string): Promise<boolean> {
    await confirmSignUp(username, otp);

    return true;
  }

  async executeResendConfirmationCode(username: string): Promise<boolean> {
    await resendConfirmationCode(username);

    return true;
  }

  async executeResetPassword(username: string): Promise<boolean> {
    await resetPassword(username);

    return true;
  }

  async executeConfirmResetPassword(
    username: string,
    password: string,
    confirmationCode: string
  ): Promise<boolean> {
    await confirmResetPassword(username, password, confirmationCode);

    return true;
  }

  async executeChangePassword(
    accessToken: string,
    previousPassword: string,
    proposedPassword: string
  ): Promise<boolean> {
    await changePassword(accessToken, previousPassword, proposedPassword);

    return true;
  }

  async executeLogin(username: string, password: string): Promise<any> {
    const loginResult = await login(username, password);

    return loginResult;
  }
}

export default AuthUserUseCaseImp;
