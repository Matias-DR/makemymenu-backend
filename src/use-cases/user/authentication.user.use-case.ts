/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { SessionModel, UserModel } from 'domain/models'
import { WrongPasswordUserException } from 'domain/exceptions/user.exceptions'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type {
  UserGateway,
  SessionGateway
} from 'domain/gateways'
import type { SessionEntity } from 'domain/entities'

export default class UserAuthenticationUseCase {
  constructor (
    private readonly userDBGateway: UserGateway,
    private readonly sessionDBGateway: SessionGateway
  ) { }

  async exe (
    email: string,
    password: string
  ): Promise<SessionEntity> {
    let user = new UserModel({ email, password })
    user.test()
    if (!await this.userDBGateway.existByEmail(email)) {
      throw new NotFoundOperationException()
    }
    user = await this.userDBGateway.getByEmail(email)
    if (!await user.comparePasswords(password)) {
      throw new WrongPasswordUserException()
    }
    if (await this.sessionDBGateway.existByUserId(user.id!)) {
      return await this.sessionDBGateway.getByUserId(user.id!)
    } else {
      const session = SessionModel.createFromEmail(email)
      return await this.sessionDBGateway.create(session)
    }
  }
}
