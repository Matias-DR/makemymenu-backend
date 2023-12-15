import type {
  UserUseCases,
  SessionUseCases
} from 'application/use-cases'

import type {
  Response
} from 'express'
import { Exception } from 'domain/exceptions/exception'

export default class Controller {
  constructor (
    protected userUseCases: UserUseCases,
    protected sessionUseCases: SessionUseCases
  ) { }

  protected error (
    res: Response,
    error: any
  ): void {
    if (error instanceof Exception) {
      res.status(error.code).json(error.spanishMessage)
    } else {
      res.status(500).json()
    }
  }
}
