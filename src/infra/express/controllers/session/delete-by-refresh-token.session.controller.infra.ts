import { SessionDeleteByRefreshTokenController } from 'controllers/session'
import Controller from '../controller.infra'
import type { SessionRepository } from 'domain/repositories'
import { SessionMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class SessionDeleteByRefreshTokenControllerInfra extends Controller {
  private readonly repository: SessionRepository

  constructor (SessionRepository: new () => SessionRepository) {
    super()
    this.repository = new SessionRepository()
  }

  async exe (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    const controller = new SessionDeleteByRefreshTokenController(this.repository)
    await controller.exe(
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
  const controller = new SessionDeleteByRefreshTokenControllerInfra(SessionMongoDBRepositoryInfra)
  await controller.exe(req, res)
}