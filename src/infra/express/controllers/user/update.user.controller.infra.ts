import { UserUpdateController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import { UserMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class UserUpdateControllerInfra extends ControllerInfra {
  private readonly controller: UserUpdateController

  constructor (Repository: new () => UserRepository) {
    super()
    this.controller = new UserUpdateController(Repository)
  }

  async exe (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
      req.headers,
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
  const controller = new UserUpdateControllerInfra(UserMongoDBRepositoryInfra)
  await controller.exe(req, res, next)
}
