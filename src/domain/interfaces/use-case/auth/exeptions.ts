export enum SignUpExceptions {
  USER_EXIST = "UsernameExistsException",
}

export enum ConfirmSignupExceptions {
  INVALID_CODE = "CodeMismatchException",
  CODE_EXPIRED = "ExpiredCodeException",
  USER_NOT_FOUND = "UserNotFoundException",
}

export enum ResendConfirmationCodeExceptions {
  USER_NOT_FOUND = "UserNotFoundException",
}

export enum ForgotPasswordExceptions {
  USER_NOT_FOUND = "UserNotFoundException",
}

export enum ConfirmForgotPasswordExceptions {
  INVALID_CODE = "CodeMismatchException",
  CODE_EXPIRED = "ExpiredCodeException",
  USER_NOT_FOUND = "UserNotFoundException",
}

export enum ChangePasswordExceptions {
  USER_NOT_FOUND = "UserNotFoundException",
  USER_NOT_CONFIRMED = "UserNotConfirmedException",
}

export enum InitiateAuthExeptions {
  USER_NOT_FOUND = "UserNotFoundException",
  USER_NOT_CONFIRMED = "UserNotConfirmedException",
  PASSWORD_RESET_REQUIRED = "PasswordResetRequiredException",
}
