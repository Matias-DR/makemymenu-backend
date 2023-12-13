import { Exception } from '../exception'

export class TheNewEmailIsTheSameAsTheCurrentFieldException extends Exception {
  constructor () {
    super(
      'To update the email, it must be different from the current one.',
      400,
      'Para actualizar el correo electrónico, este debe ser diferente al actual.'
    )
  }
}

export class SameEmailFieldException extends Exception {
  constructor () {
    super(
      'New email is the same as the current one.',
      400,
      'El nuevo correo electrónico es igual al actual.'
    )
  }
}

export class InvalidEmailFieldException extends Exception {
  constructor () {
    super(
      'Invalid email',
      400,
      'Correo electrónico inválido.'
    )
  }
}

export class EmailRequiredFieldException extends Exception {
  constructor () {
    super(
      'Email is required',
      400,
      'El correo electrónico es requerido.'
    )
  }
}

export class NewEmailAlreadyInUseFieldException extends Exception {
  constructor () {
    super(
      'New email already in use.',
      409,
      'El nuevo correo electrónico ya está en uso.'
    )
  }
}

export default {
  TheNewEmailIsTheSameAsTheCurrentFieldException,
  SameEmailFieldException,
  InvalidEmailFieldException,
  EmailRequiredFieldException,
  NewEmailAlreadyInUseFieldException
}
