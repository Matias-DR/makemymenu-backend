import { UserDeleteController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerImpl from '../controller.impl'
import { UserMongoDBRepositoryImpl } from 'impl/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class UserDeleteControllerImpl extends ControllerImpl {
  private readonly controller: UserDeleteController

  constructor (UserRepository: new () => UserRepository) {
    super()
    this.controller = new UserDeleteController(new UserRepository())
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
  const controller = new UserDeleteControllerImpl(UserMongoDBRepositoryImpl)
  await controller.exe(req, res, next)
}
