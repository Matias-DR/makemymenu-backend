import { UserAuthenticationUseCase } from 'use-cases/user'
import type { SuccessfullResponse, UnsuccessfullResponse } from 'controllers/definitions'
import type {
  UserRepository,
  SessionRepository
} from 'domain/repositories'
import {
  UserDBGateway,
  SessionDBGateway
} from 'gateways/databases'

export default class UserAuthenticationController {
  private readonly userDBGateway: UserDBGateway
  private readonly sessionDBGateway: SessionDBGateway

  constructor (
    UserRepository: new () => UserRepository,
    SessionRepository: new () => SessionRepository
  ) {
    this.userDBGateway = new UserDBGateway(UserRepository)
    this.sessionDBGateway = new SessionDBGateway(SessionRepository)
  }

  async exe (
    body: any,
    error: UnsuccessfullResponse,
    success: SuccessfullResponse
  ): Promise<void> {
    try {
      const email = body.email
      const password = body.password
      const useCase = new UserAuthenticationUseCase(
        this.userDBGateway,
        this.sessionDBGateway
      )
      const output = await useCase.exe(
        email,
        password
      )
      const session = {
        accessToken: output.accessToken,
        refreshToken: output.refreshToken
      }
      success(200, session)
    } catch (err: any) {
      error(err)
    }
  }
}
