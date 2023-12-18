import { Exception } from './exception'

export class TheNewEmailIsTheSameAsTheCurrentUserException extends Exception {
  constructor () {
    super(
      'To update the email, it must be different from the current one.',
      400,
      'Para actualizar el correo electrónico, este debe ser diferente al actual.'
    )
  }
}

export class SameEmailUserException extends Exception {
  constructor () {
    super(
      'New email is the same as the current one.',
      400,
      'El nuevo correo electrónico es igual al actual.'
    )
  }
}

export class InvalidEmailUserException extends Exception {
  constructor () {
    super(
      'Invalid email',
      400,
      'Correo electrónico inválido.'
    )
  }
}

export class EmailRequiredUserException extends Exception {
  constructor () {
    super(
      'Email is required',
      400,
      'El correo electrónico es requerido.'
    )
  }
}

export class NewEmailAlreadyInUseUserException extends Exception {
  constructor () {
    super(
      'New email already in use.',
      409,
      'El nuevo correo electrónico ya está en uso.'
    )
  }
}

export class InvalidPasswordUserException extends Exception {
  constructor () {
    super(
      'Invalid password. It must have at least 8 characters and a maximum of 64.',
      400,
      'Contraseña inválida. Debe tener al menos 8 caracteres y un máximo de 64.'
    )
  }
}

export class PasswordRequiredUserException extends Exception {
  constructor () {
    super(
      'Password is required',
      400,
      'La contraseña es requerida'
    )
  }
}

export class TheNewPasswordIsTheSameAsTheCurrentUserException extends Exception {
  constructor () {
    super(
      'To update the password, it must be different from the current one.',
      400,
      'Para actualizar la contraseña, esta debe ser diferente a la actual.'
    )
  }
}

export class WrongPasswordConfirmationUserException extends Exception {
  constructor () {
    super(
      'Wrong password confirmation. It must be equal to password',
      400,
      'Confirmación de contraseña incorrecta. Debe ser igual a la contraseña.'
    )
  }
}

export class PasswordConfirmationRequiredUserException extends Exception {
  constructor () {
    super(
      'Password confirmation is required',
      400,
      'La confirmación de contraseña es requerida.'
    )
  }
}

export class WrongPasswordUserException extends Exception {
  constructor () {
    super(
      'Wrong password.',
      401,
      'Contraseña incorrecta.'
    )
  }
}
