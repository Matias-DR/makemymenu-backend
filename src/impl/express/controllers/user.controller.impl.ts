import { UserController } from 'controllers'
import Controller from './controller.impl'
import type { UserRepository } from 'domain/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export default class UserControllerImpl extends Controller {
  private readonly controller: UserController

  constructor (UserRepository: new () => UserRepository) {
    super()
    this.controller = new UserController(new UserRepository())
  }

  async create (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.create(
      req.body,
      this.success,
      this.error
    )
  }

  async update (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.update(
      req.headers,
      req.body,
      this.error,
      next
    )
  }

  async delete (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.delete(
      req.headers,
      req.body,
      this.error,
      next
    )
  }

  async authentication (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.authentication(
      req.body,
      this.error,
      next
    )
  }
}
