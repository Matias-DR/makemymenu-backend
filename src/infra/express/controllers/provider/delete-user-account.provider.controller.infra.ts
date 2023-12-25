import { ProviderUserAccountDeleteController } from 'controllers/provider'
import type { UserRepository } from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import { UserMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class ProviderUserAccountDeleteControllerInfra extends ControllerInfra {
  private readonly controller: ProviderUserAccountDeleteController

  constructor (Repository: new () => UserRepository) {
    super()
    this.controller = new ProviderUserAccountDeleteController(Repository)
  }

  async exe (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
      req.headers,
      this.error,
      next
    )
  }
}

export const mongoose = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const controller = new ProviderUserAccountDeleteControllerInfra(UserMongoDBRepositoryInfra)
  await controller.exe(req, res, next)
}
