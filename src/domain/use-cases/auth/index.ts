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
import { CollectionRepository } from "../../interfaces/repositories/collection";

class AuthUserUseCaseImp implements AuthUserUseCase {
  profileRepository: ProfileRepository;
  collectionRepository: CollectionRepository;

  constructor(
    profileRepository: ProfileRepository,
    collectionRepository: CollectionRepository
  ) {
    this.profileRepository = profileRepository;
    this.collectionRepository = collectionRepository;
  }

  async executeCreateUser(user: TUserRegistration): Promise<boolean> {
    const { username, profiles, email } = user;

    // will throw error if user exist
    await signUp(user);

    // create profile

    const createdProfile = await this.profileRepository.createOneProfile({
      profiles,
      email,
      username,
    });

    const createCollection =
      await this.collectionRepository.createOneCollection({
        username: username,
        collection: [],
      });

    if (createdProfile && createCollection) return true;
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
