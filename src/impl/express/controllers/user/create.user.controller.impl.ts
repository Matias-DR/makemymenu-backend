import { UserCreateController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerImpl from '../controller.impl'
import { UserMongoDBRepositoryImpl } from 'impl/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class UserCreateControllerImpl extends ControllerImpl {
  private readonly controller: UserCreateController

  constructor (UserRepository: new () => UserRepository) {
    super()
    this.controller = new UserCreateController(new UserRepository())
  }

  async exe (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
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
  const controller = new UserCreateControllerImpl(UserMongoDBRepositoryImpl)
  await controller.exe(req, res)
}
