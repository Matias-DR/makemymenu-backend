import { Exception } from './exception'

export class InvalidTokenException extends Exception {
  constructor () {
    super(
      'Invalid token.',
      401,
      'Token inválido.'
    )
  }
}

export class NoTokenGivenException extends Exception {
  constructor () {
    super(
      'No token given.',
      401,
      'No se ah proporcionado token.'
    )
  }
}

export class ExpiredTokenException extends Exception {
  constructor () {
    super(
      'The session has expired.',
      401,
      'La sesión ha expirado.'
    )
  }
}

export class UnhauthorizedException extends Exception {
  constructor () {
    super(
      'Unauthorized.',
      401,
      'Acceso denegado.'
    )
  }
}
