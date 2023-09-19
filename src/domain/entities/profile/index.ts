export interface CreateProfileRequestModel {
  username: string;
  profiles: ProfileResponseModel[];
}

export interface ProfileResponseModel {
  email?: string;
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
