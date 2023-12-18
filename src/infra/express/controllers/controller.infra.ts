import { Exception } from 'domain/exceptions/exception'

import type { Response } from 'express'

export default class ControllerInfra {
  private _res!: Response

  get res (): Response {
    return this._res
  }

  set res (res: Response) {
    this._res = res
  }

  protected success = (
    code: number,
    data?: any
  ): void => {
    if (this.res !== undefined) {
      if (data !== null && data !== undefined) {
        this.res.status(code).json(data)
      } else {
        this.res.status(code).json()
      }
    }
  }

  protected error = (
    err: any
  ): void => {
    if (this.res !== undefined) {
      if (err instanceof Exception) {
        this.res.status(err.code).json(err.spanishMessage)
      } else {
        this.res.status(500).json()
      }
    }
  }
}
