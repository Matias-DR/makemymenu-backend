import { SessionUpdateByAccessTokenController } from 'controllers/session'
import Controller from '../controller.infra'
import type { SessionRepository } from 'domain/repositories'
import { SessionMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class SessionUpdateControllerInfra extends Controller {
  private readonly controller: SessionUpdateByAccessTokenController

  constructor (Repository: new () => SessionRepository) {
    super()
    this.controller = new SessionUpdateByAccessTokenController(Repository)
  }

  async exe (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
      req.headers,
      this.success,
      this.error
    )
  }
}

export async function mongoose (
  req: Request,
  res: Response
): Promise<void> {
  const controller = new SessionUpdateControllerInfra(SessionMongoDBRepositoryInfra)
  await controller.exe(req, res)
}
