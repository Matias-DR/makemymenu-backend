import { UserUpdateController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerImpl from '../controller.impl'
import { UserMongoDBRepositoryImpl } from 'impl/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class UserUpdateControllerImpl extends ControllerImpl {
  private readonly controller: UserUpdateController

  constructor (UserRepository: new () => UserRepository) {
    super()
    this.controller = new UserUpdateController(new UserRepository())
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

export async function mongoose (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const controller = new UserUpdateControllerImpl(UserMongoDBRepositoryImpl)
  await controller.exe(req, res, next)
}
