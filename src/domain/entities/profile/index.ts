export interface CreateProfileRequestModel {
  username: string;
  profiles: ProfileResponseModel[];
}

export interface ProfileResponseModel {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface AccountResponseModel {
  username: string;
  profiles: ProfileResponseModel[];
}
