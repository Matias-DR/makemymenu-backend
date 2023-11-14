export class AlreadyExistOperationException extends Error {
  constructor () {
    super('Data already exist.')
  }
}

export class NotFoundOperationException extends Error {
  constructor () {
    super('Data not found.')
  }
}

export class NothingToUpdateOperationException extends Error {
  constructor () {
    super('Nothing to updated.')
  }
}

export class UnsuccessfulOperationException extends Error {
  constructor () {
    super('An error has occurred. Unsuccessful operation')
  }
}

export default {
  AlreadyExistOperationException,
  NotFoundOperationException,
  NothingToUpdateOperationException,
  UnsuccessfulOperationException
}
