import { UserAuthenticationController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import { UserMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class UserAuthenticationControllerInfra extends ControllerInfra {
  private readonly controller: UserAuthenticationController

  constructor (Repository: new () => UserRepository) {
    super()
    this.controller = new UserAuthenticationController(Repository)
  }

  async exe (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
      req.body,
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
  const controller = new UserAuthenticationControllerInfra(UserMongoDBRepositoryInfra)
  await controller.exe(req, res, next)
}
