export class InvalidPasswordFieldException extends Error {
  constructor () {
    super('Invalid password. It must have at least 8 characters and a maximum of 64.')
  }
}

export class NewPasswordConfirmationIsDifferentFromNewPasswordFieldException extends Error {
  constructor () {
    super('The new password confirmation must match the new password.')
  }
}

export class PasswordRequiredFieldException extends Error {
  constructor () {
    super('Password is required')
  }
}

export class TheNewPasswordIsTheSameAsTheCurrentFieldException extends Error {
  constructor () {
    super('To update the password, it must be different from the current one.')
  }
}

export class WrongPasswordConfirmationFieldException extends Error {
  constructor () {
    super('Wrong password confirmation. It must be equal to password')
  }
}

export class WrongPasswordFieldException extends Error {
  constructor () {
    super('Wrong password.')
  }
}

export default {
  InvalidPasswordFieldException,
  NewPasswordConfirmationIsDifferentFromNewPasswordFieldException,
  PasswordRequiredFieldException,
  TheNewPasswordIsTheSameAsTheCurrentFieldException,
  WrongPasswordConfirmationFieldException,
  WrongPasswordFieldException
}
