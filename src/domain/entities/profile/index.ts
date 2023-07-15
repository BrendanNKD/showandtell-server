export interface CreateProfileRequestModel {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  username: string;
}

export interface ProfileResponseModel {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  username: string;
}
