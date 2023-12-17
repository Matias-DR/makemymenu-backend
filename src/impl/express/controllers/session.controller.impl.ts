import { SessionController } from 'controllers'
import Controller from './controller.impl'
import type { SessionRepository } from 'domain/repositories'

import type {
  Request,
  Response
} from 'express'

export default class SessionControllerImpl extends Controller {
  private readonly controller: SessionController

  constructor (SessionRepository: new () => SessionRepository) {
    super()
    this.controller = new SessionController(new SessionRepository())
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
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.update(
      req.body,
      this.success,
      this.error
    )
  }

  async deleteByRefreshToken (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.deleteByRefreshToken(
      req.headers,
      this.success,
      this.error
    )
  }

  async deleteByAccessToken (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.deleteByAccessToken(
      req.headers,
      this.success,
      this.error
    )
  }
}
