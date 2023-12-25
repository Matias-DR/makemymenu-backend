import type { UserRepository } from 'domain/repositories'
import { ProviderUserDeleteByEmailUseCase } from 'use-cases/provider'
import type { UnsuccessfullResponse } from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'

export default class ProviderUserAccountDeleteController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    headers: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const token = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(token)
      const useCase = new ProviderUserDeleteByEmailUseCase(this.dbGateway)
      await useCase.exe(email)
      next()
      // await this.sessionUseCases.deleteByAccessToken(token)
    } catch (err: any) {
      error(err)
    }
  }
}
