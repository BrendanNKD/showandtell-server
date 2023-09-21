export interface CreateProfileRequestModel {
  username: string;
  email: string;
  profiles: ProfileResponseModel[];
}

export interface ProfileResponseModel {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profilePic: number;
}

export interface AccountResponseModel {
  username: string;
  profiles: ProfileResponseModel[];
}

export interface ProfileRequestModel {
  username: string;
  profile: ProfileResponseModel;
}

export interface UpdateProfileRequestModel {
  username: string;
  index: number;
  profile: ProfileResponseModel;
}
