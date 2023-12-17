import { UserAuthenticationController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerImpl from '../controller.impl'
import { UserMongoDBRepositoryImpl } from 'impl/mongoose/repositories'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export class UserAuthenticationControllerImpl extends ControllerImpl {
  private readonly controller: UserAuthenticationController

  constructor (UserRepository: new () => UserRepository) {
    super()
    this.controller = new UserAuthenticationController(new UserRepository())
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

export async function mongoose (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const controller = new UserAuthenticationControllerImpl(UserMongoDBRepositoryImpl)
  await controller.exe(req, res, next)
}
