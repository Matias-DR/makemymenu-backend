import { UserAuthenticationController } from 'controllers/user'
import type {
  UserRepository,
  SessionRepository
} from 'domain/repositories'
import ControllerInfra from '../controller.infra'
import {
  SessionMongoDBRepositoryInfra,
  UserMongoDBRepositoryInfra
} from 'infra/mongoose/repositories'

import type {
  Request,
  Response
} from 'express'

export class UserAuthenticationControllerInfra extends ControllerInfra {
  private readonly controller: UserAuthenticationController

  constructor (
    UserRepository: new () => UserRepository,
    SessionRepository: new () => SessionRepository
  ) {
    super()
    this.controller = new UserAuthenticationController(
      UserRepository,
      SessionRepository
    )
  }

  async exe (
    req: Request,
    res: Response
  ): Promise<void> {
    this.res = res
    await this.controller.exe(
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
  const controller = new UserAuthenticationControllerInfra(
    UserMongoDBRepositoryInfra,
    SessionMongoDBRepositoryInfra
  )
  await controller.exe(req, res)
}
