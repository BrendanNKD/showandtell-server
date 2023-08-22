import { ProfileResponseModel } from "../profile";

export type TUserRegistration = {
  password: string;
  username: string;
  profiles: ProfileResponseModel[];
};
