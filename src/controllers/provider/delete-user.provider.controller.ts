import type { UserRepository } from 'domain/repositories'
import { ProviderUserDeleteByEmailUseCase } from 'use-cases/provider'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'

export default class ProviderUserDeleteController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    headers: any,
    body: any,
    error: UnsuccessfullResponse,
    success: SuccessfullResponse
  ): Promise<void> {
    try {
      const token = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(token)
      const provider = body.provider
      const useCase = new ProviderUserDeleteByEmailUseCase(this.dbGateway)
      await useCase.exe(
        email,
        provider
      )
      success(200)
    } catch (err: any) {
      error(err)
    }
  }
}
