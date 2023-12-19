import type { UserRepository } from 'domain/repositories'
import { UserDeleteByEmailUseCase } from 'use-cases/user'
import type { UnsuccessfullResponse } from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'

export default class UserDeleteController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    headers: any,
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(accessToken)
      const password = body.password
      const useCase = new UserDeleteByEmailUseCase(this.dbGateway)
      await useCase.exe(
        email,
        password
      )
      next()
      // await this.sessionUseCases.deleteByAccessToken(token)
    } catch (err: any) {
      error(err)
    }
  }
}
