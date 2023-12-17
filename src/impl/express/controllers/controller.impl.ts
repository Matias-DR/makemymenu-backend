import { Exception } from 'domain/exceptions/exception'

import type {
  Response
} from 'express'

export default class ControllerImpl {
  private _res: Response | undefined

  public get res (): Response | undefined {
    return this._res
  }

  public set res (res: Response) {
    this._res = res
  }

  protected success (
    code: number,
    data?: any
  ): void {
    if (this.res !== undefined) {
      if (data !== null && data !== undefined) {
        this.res.status(code).json(data)
      } else {
        this.res.status(code).json()
      }
    }
  }

  protected error (
    error: any
  ): void {
    if (this.res !== undefined) {
      if (error instanceof Exception) {
        this.res.status(error.code).json(error.spanishMessage)
      } else {
        this.res.status(500).json()
      }
    }
  }
}
