import { Exception } from './exception'

export class InvalidTokenException extends Exception {
  constructor () {
    super(
      'Invalid token.',
      100,
      'Token inválido.'
    )
  }
}

export class NoTokenGivenException extends Exception {
  constructor () {
    super(
      'No token given.',
      101,
      'No se ha proporcionado un token.'
    )
  }
}
