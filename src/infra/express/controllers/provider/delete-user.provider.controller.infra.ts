import { ProviderUserDeleteController } from 'controllers/provider'
import type { UserRepository } from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import { UserMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class ProviderUserDeleteControllerInfra extends ControllerInfra {
  private readonly controller: ProviderUserDeleteController

  constructor (Repository: new () => UserRepository) {
    super()
    this.controller = new ProviderUserDeleteController(Repository)
  }

  async exe (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
      req.headers,
      req.body,
      this.error,
      this.success
    )
  }
}

export const mongoose = async (
  req: Request,
  res: Response
): Promise<void> => {
  const controller = new ProviderUserDeleteControllerInfra(UserMongoDBRepositoryInfra)
  await controller.exe(req, res)
}
