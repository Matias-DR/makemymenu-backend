import { UserCreateController } from 'controllers/user'
import type { UserRepository } from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import { UserMongoDBRepositoryInfra } from 'infra/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class UserCreateControllerInfra extends ControllerInfra {
  private readonly controller: UserCreateController

  constructor (Repository: new () => UserRepository) {
    super()
    this.controller = new UserCreateController(Repository)
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

export const mongoose = async (
  req: Request,
  res: Response
): Promise<void> => {
  const controller = new UserCreateControllerInfra(UserMongoDBRepositoryInfra)
  await controller.exe(req, res)
}
