export class TheNewEmailIsTheSameAsTheCurrentFieldException extends Error {
  constructor () {
    super('To update the email, it must be different from the current one.')
  }
}

export class SameEmailFieldException extends Error {
  constructor () {
    super('New email is the same as the current one.')
  }
}

export class InvalidEmailFieldException extends Error {
  constructor () {
    super('Invalid email, it must have a valid format. For example: ex@ex.ex')
  }
}

export class EmailRequiredFieldException extends Error {
  constructor () {
    super('Email is required')
  }
}

export class NewEmailAlreadyInUseFieldException extends Error {
  constructor () {
    super('New email already in use.')
  }
}

export default {
  TheNewEmailIsTheSameAsTheCurrentFieldException,
  SameEmailFieldException,
  InvalidEmailFieldException,
  EmailRequiredFieldException,
  NewEmailAlreadyInUseFieldException
}
