import { Exception } from './exception'

export class NotFoundOperationException extends Exception {
  constructor () {
    super(
      'Data not found.',
      404,
      'Datos no encontrados.'
    )
  }
}

export class UnsuccessfulOperationException extends Exception {
  constructor () {
    super(
      'An error has occurred. Unsuccessful operation',
      500,
      'Ha ocurrido un error. Operación fallida.'
    )
  }
}

export class AlreadyExistOperationException extends Exception {
  constructor () {
    super(
      'Data already exist.',
      409,
      'Los datos ya existen.'
    )
  }
}

export class NothingToUpdateOperationException extends Exception {
  constructor () {
    super(
      'Nothing to updated.',
      400,
      'Nada que actualizar.'
    )
  }
}

export class ImpossibleToPerformOperationException extends Exception {
  constructor () {
    super(
      'Impossible to perform the operation.',
      400,
      'Imposible realizar la operación.'
    )
  }
}
