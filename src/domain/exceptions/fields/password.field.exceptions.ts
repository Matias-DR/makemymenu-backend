import { Exception } from '../exception'

export class InvalidPasswordFieldException extends Exception {
  constructor () {
    super(
      'Invalid password. It must have at least 8 characters and a maximum of 64.',
      210,
      'Contraseña inválida. Debe tener al menos 8 caracteres y un máximo de 64.'
    )
  }
}

export class NewPasswordConfirmationIsDifferentFromNewPasswordFieldException extends Exception {
  constructor () {
    super(
      'The new password confirmation must match the new password.',
      211,
      'La confirmación de la nueva contraseña debe coincidir con la nueva contraseña.'
    )
  }
}

export class PasswordRequiredFieldException extends Exception {
  constructor () {
    super(
      'Password is required',
      212,
      'La contraseña es requerida'
    )
  }
}

export class TheNewPasswordIsTheSameAsTheCurrentFieldException extends Exception {
  constructor () {
    super(
      'To update the password, it must be different from the current one.',
      213,
      'Para actualizar la contraseña, esta debe ser diferente a la actual.'
    )
  }
}

export class WrongPasswordConfirmationFieldException extends Exception {
  constructor () {
    super(
      'Wrong password confirmation. It must be equal to password',
      214,
      'Confirmación de contraseña incorrecta. Debe ser igual a la contraseña.'
    )
  }
}

export class WrongPasswordFieldException extends Exception {
  constructor () {
    super(
      'Wrong password.',
      215,
      'Contraseña incorrecta.'
    )
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
