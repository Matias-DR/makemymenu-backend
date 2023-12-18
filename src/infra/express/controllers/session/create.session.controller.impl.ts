import { SessionCreateController } from 'controllers/session'
import Controller from '../controller.impl'
import type { SessionRepository } from 'domain/repositories'
import { SessionMongoDBRepositoryImpl } from 'impl/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class SessionCreateControllerImpl extends Controller {
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
    const controller = new SessionCreateController(this.repository)
    await controller.exe(
      req.body,
      this.success,
      this.error
    )
  }
}

export async function mongoose (
  req: Request,
  res: Response
): Promise<void> {
  const controller = new SessionCreateControllerImpl(SessionMongoDBRepositoryImpl)
  await controller.exe(req, res)
}
